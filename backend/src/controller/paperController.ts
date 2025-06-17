import { Response, Request } from "express";
import catchAsync from "../lib/catchAsync";
import prisma from "../utils/prisma";
import { generateEmbedding } from "../utils/embeddings";
import { generateEmbeddingsHuggingFace } from "../utils/generateEmbeddings";
require("dotenv").config();

export const getSearchResults = catchAsync(
  async (req: Request, res: Response) => {
    const { limit, size, query } = req.query;

    // const queryVector = await generateEmbedding(query as string);
    const queryVector = await generateEmbeddingsHuggingFace(query as string);

    const results = await prisma.$runCommandRaw({
      aggregate: "Paper",
      pipeline: [
        {
          $vectorSearch: {
            index: "vector_index",
            path: "embeddings",
            queryVector: queryVector as number[],
            numCandidates: Number(size),
            limit: Number(limit),
          },
        },
        {
          $replaceWith: {
            $unsetField: {
              field: { $literal: "embeddings" },
              input: "$$ROOT",
            },
          },
        },
      ],
      cursor: {},
    });

    // console.log((results.cursor as any).firstBatch);

    res.status(200).json({
      status: "success",
      data: (results.cursor as any).firstBatch,
    });
  }
);

export const getSummary = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const paper = await prisma.paper.findFirst({
    where: {
      id: id,
    },
    select: {
      abstract: true,
    },
  });

  res.status(200).json({
    status: "success",
    // data: paper,
  });
});

export const getPaper = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const paper = await prisma.paper.findUnique({
    where: {
      id,
    },
    select: {
      title: true,
      abstract: true,
      authors: true,
      publishedDate: true,
      updatedDate: true,
      primaryCategory: true,
      pdfUrl: true,
      categories: true,
      html: true,
      journalRef: true,
    },
  });

  res.status(200).json({
    status: "success",
    data: paper,
  });
});

export const getRelatedPapers = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;

    const { limit = 5 } = req.query;

    const sourcePaper = await prisma.paper.findUnique({
      where: { id },
      select: { abstract: true },
    });

    if (!sourcePaper) {
      return res.status(404).json({
        status: "error",
        message: "No Paper found with the given ID",
      });
    }

    const queryVector = await generateEmbeddingsHuggingFace(
      sourcePaper.abstract
    );

    const results = await prisma.$runCommandRaw({
      aggregate: "Paper",
      pipeline: [
        {
          $vectorSearch: {
            index: "vector_index",
            path: "embeddings",
            queryVector: queryVector as number[],
            numCandidates: 20,
            limit: Number(limit),
          },
        },
        {
          $replaceWith: {
            $mergeObjects: [
              "$$ROOT",
              { id: { $toString: "$_id" } }, // Convert _id to string format
            ],
          },
        },
        {
          $match: {
            id: { $ne: id }, // Now we can match against the converted id
          },
        },
        {
          $project: {
            _id: 1,
            title: 1,
            abstract: 1,
            primaryCategory: 1,
          },
        },
      ],
      cursor: {},
    });

    res.status(200).json({
      status: "success",
      data: (results.cursor as any).firstBatch,
    });
  }
);

export const getHomePageData = catchAsync(
  async (req: Request, res: Response) => {
    const results = await prisma.$runCommandRaw({
      aggregate: "Paper",
      pipeline: [
        {
          $facet: {
            recentPapers: [
              { $sort: { publishedDate: -1 } },
              { $limit: 20 },
              {
                $project: {
                  _id: 1,
                  title: 1,
                  abstract: 1,
                  authors: 1,
                  className: 1,
                  primaryCategory: 1,
                },
              },
            ],
            topCategories: [
              { $unwind: "$categories" },
              {
                $group: {
                  _id: "$categories",
                  count: { $sum: 1 },
                  papers: {
                    $push: {
                      id: "$_id",
                      title: "$title",
                      publishedDate: "$publishedDate",
                    },
                  },
                },
              },
              { $sort: { count: -1 } },
              { $limit: 20 },
              {
                $project: {
                  category: "$_id",
                  count: 1,
                  recentPapers: { $slice: ["$papers", 3] },
                },
              },
            ],
          },
        },
      ],
      cursor: {},
    });

    const data = (results.cursor as any).firstBatch[0];
    if (data.recentPapers) {
      data.recentPapers = data.recentPapers.map(
        (paper: any, index: number) => ({
          ...paper,
          className: generateBentoClassName(index),
        })
      );
    }

    res.json({
      status: "success",
      data,
    });
  }
);

export const getCategories = catchAsync(async (req: Request, res: Response) => {
  const results = await prisma.$runCommandRaw({
    aggregate: "Paper",
    pipeline: [
      {
        $unwind: "$categories",
      },
      {
        $group: {
          _id: "$categories",
          count: { $sum: 1 },
          papers: {
            $push: {
              id: "$_id",
              title: "$title",
              publishedDate: "$publishedDate",
            },
          },
        },
      },
      {
        $project: {
          category: "$_id",
          count: 1,
          // recentPapers: { $slice: ["$papers", 3] },
        },
      },
      {
        $sort: { count: -1 },
      },
    ],
    cursor: {},
  });

  res.status(200).json({
    status: "success",
    data: (results.cursor as any).firstBatch,
  });
});

const generateBentoClassName = (index: number): string => {
  const patterns = [
    "md:col-span-2",
    "md:col-span-1",
    "md:col-span-1",
    "md:col-span-2",
  ];
  return patterns[index % patterns.length];
};
