import { cn } from "../lib/utils";
import React from "react";
import { BentoGrid, BentoGridItem } from "./ui/bentogrid";
import {
  IconClipboardCopy,
  IconFileBroken,
  IconSignature,
  IconTableColumn,
} from "@tabler/icons-react";

export function List() {
  return (
    <BentoGrid className="max-w-5xl mb-8 -mt-44  mx-auto gap-6 md:auto-rows-[18rem]">
      {items.map((item, i) => (
        <BentoGridItem
          key={i}
          index={i}
          id={`${i}`}
          title={item.title}
          complete={false}
          description={item.description}
          className={item.className}
          icon={item.icon}
        />
      ))}
    </BentoGrid>
  );
}
const items = [
  {
    title:
      "Visions of a Discipline: Analyzing Introductory AI Courses on YouTube",
    description:
      "This research investigates the curriculum structures of undergraduate\nArtificial Intelligence (AI) education across universities worldwide. By\nexamining the curricula of leading universities, the research seeks to\ncontribute to a deeper understanding of AI education on a global scale,\nfacilitating the alignment of educational practices with the evolving needs of\nthe AI landscape. This research delves into the diverse course structures of\nleading universities, exploring contemporary trends and priorities to reveal\nthe nuanced approaches in AI education. It also investigates the core AI topics\nand learning contents frequently taught, comparing them with the CS2023\ncurriculum guidance to identify convergence and divergence. Additionally, it\nexamines how universities across different countries approach AI education,\nanalyzing educational objectives, priorities, potential careers, and\nmethodologies to understand the global landscape and implications of AI\npedagogy.\n",
    className: "md:col-span-2",
    icon: <IconClipboardCopy className="h-4 w-4 text-neutral-500" />,
  },
  {
    title:
      "Visions of a Discipline: Analyzing Introductory AI Courses on YouTube",
    description:
      "This research investigates the curriculum structures of undergraduate\nArtificial Intelligence (AI) education across universities worldwide. By\nexamining the curricula of leading universities, the research seeks to\ncontribute to a deeper understanding of AI education on a global scale,\nfacilitating the alignment of educational practices with the evolving needs of\nthe AI landscape. This research delves into the diverse course structures of\nleading universities, exploring contemporary trends and priorities to reveal\nthe nuanced approaches in AI education. It also investigates the core AI topics\nand learning contents frequently taught, comparing them with the CS2023\ncurriculum guidance to identify convergence and divergence. Additionally, it\nexamines how universities across different countries approach AI education,\nanalyzing educational objectives, priorities, potential careers, and\nmethodologies to understand the global landscape and implications of AI\npedagogy.\n",
    className: "md:col-span-1",
    icon: <IconFileBroken className="h-4 w-4 text-neutral-500" />,
  },
  {
    title:
      "Visions of a Discipline: Analyzing Introductory AI Courses on YouTube",
    description:
      "This research investigates the curriculum structures of undergraduate\nArtificial Intelligence (AI) education across universities worldwide. By\nexamining the curricula of leading universities, the research seeks to\ncontribute to a deeper understanding of AI education on a global scale,\nfacilitating the alignment of educational practices with the evolving needs of\nthe AI landscape. This research delves into the diverse course structures of\nleading universities, exploring contemporary trends and priorities to reveal\nthe nuanced approaches in AI education. It also investigates the core AI topics\nand learning contents frequently taught, comparing them with the CS2023\ncurriculum guidance to identify convergence and divergence. Additionally, it\nexamines how universities across different countries approach AI education,\nanalyzing educational objectives, priorities, potential careers, and\nmethodologies to understand the global landscape and implications of AI\npedagogy.\n",
    className: "md:col-span-1",
    icon: <IconSignature className="h-4 w-4 text-neutral-500" />,
  },
  {
    title:
      "Visions of a Discipline: Analyzing Introductory AI Courses on YouTube",
    description:
      "This research investigates the curriculum structures of undergraduate\nArtificial Intelligence (AI) education across universities worldwide. By\nexamining the curricula of leading universities, the research seeks to\ncontribute to a deeper understanding of AI education on a global scale,\nfacilitating the alignment of educational practices with the evolving needs of\nthe AI landscape. This research delves into the diverse course structures of\nleading universities, exploring contemporary trends and priorities to reveal\nthe nuanced approaches in AI education. It also investigates the core AI topics\nand learning contents frequently taught, comparing them with the CS2023\ncurriculum guidance to identify convergence and divergence. Additionally, it\nexamines how universities across different countries approach AI education,\nanalyzing educational objectives, priorities, potential careers, and\nmethodologies to understand the global landscape and implications of AI\npedagogy.\n",
    className: "md:col-span-2",
    icon: <IconTableColumn className="h-4 w-4 text-neutral-500" />,
  },
  {
    title:
      "Visions of a Discipline: Analyzing Introductory AI Courses on YouTube",
    description:
      "This research investigates the curriculum structures of undergraduate\nArtificial Intelligence (AI) education across universities worldwide. By\nexamining the curricula of leading universities, the research seeks to\ncontribute to a deeper understanding of AI education on a global scale,\nfacilitating the alignment of educational practices with the evolving needs of\nthe AI landscape. This research delves into the diverse course structures of\nleading universities, exploring contemporary trends and priorities to reveal\nthe nuanced approaches in AI education. It also investigates the core AI topics\nand learning contents frequently taught, comparing them with the CS2023\ncurriculum guidance to identify convergence and divergence. Additionally, it\nexamines how universities across different countries approach AI education,\nanalyzing educational objectives, priorities, potential careers, and\nmethodologies to understand the global landscape and implications of AI\npedagogy.\n",
    className: "md:col-span-2",
    icon: <IconClipboardCopy className="h-4 w-4 text-neutral-500" />,
  },
  {
    title:
      "Visions of a Discipline: Analyzing Introductory AI Courses on YouTube",
    description:
      "This research investigates the curriculum structures of undergraduate\nArtificial Intelligence (AI) education across universities worldwide. By\nexamining the curricula of leading universities, the research seeks to\ncontribute to a deeper understanding of AI education on a global scale,\nfacilitating the alignment of educational practices with the evolving needs of\nthe AI landscape. This research delves into the diverse course structures of\nleading universities, exploring contemporary trends and priorities to reveal\nthe nuanced approaches in AI education. It also investigates the core AI topics\nand learning contents frequently taught, comparing them with the CS2023\ncurriculum guidance to identify convergence and divergence. Additionally, it\nexamines how universities across different countries approach AI education,\nanalyzing educational objectives, priorities, potential careers, and\nmethodologies to understand the global landscape and implications of AI\npedagogy.\n",
    className: "md:col-span-1",
    icon: <IconFileBroken className="h-4 w-4 text-neutral-500" />,
  },
  {
    title:
      "Visions of a Discipline: Analyzing Introductory AI Courses on YouTube",
    description:
      "This research investigates the curriculum structures of undergraduate\nArtificial Intelligence (AI) education across universities worldwide. By\nexamining the curricula of leading universities, the research seeks to\ncontribute to a deeper understanding of AI education on a global scale,\nfacilitating the alignment of educational practices with the evolving needs of\nthe AI landscape. This research delves into the diverse course structures of\nleading universities, exploring contemporary trends and priorities to reveal\nthe nuanced approaches in AI education. It also investigates the core AI topics\nand learning contents frequently taught, comparing them with the CS2023\ncurriculum guidance to identify convergence and divergence. Additionally, it\nexamines how universities across different countries approach AI education,\nanalyzing educational objectives, priorities, potential careers, and\nmethodologies to understand the global landscape and implications of AI\npedagogy.\n",
    className: "md:col-span-1",
    icon: <IconSignature className="h-4 w-4 text-neutral-500" />,
  },
  {
    title:
      "Visions of a Discipline: Analyzing Introductory AI Courses on YouTube",
    description:
      "This research investigates the curriculum structures of undergraduate\nArtificial Intelligence (AI) education across universities worldwide. By\nexamining the curricula of leading universities, the research seeks to\ncontribute to a deeper understanding of AI education on a global scale,\nfacilitating the alignment of educational practices with the evolving needs of\nthe AI landscape. This research delves into the diverse course structures of\nleading universities, exploring contemporary trends and priorities to reveal\nthe nuanced approaches in AI education. It also investigates the core AI topics\nand learning contents frequently taught, comparing them with the CS2023\ncurriculum guidance to identify convergence and divergence. Additionally, it\nexamines how universities across different countries approach AI education,\nanalyzing educational objectives, priorities, potential careers, and\nmethodologies to understand the global landscape and implications of AI\npedagogy.\n",
    className: "md:col-span-2",
    icon: <IconTableColumn className="h-4 w-4 text-neutral-500" />,
  },
  {
    title:
      "Visions of a Discipline: Analyzing Introductory AI Courses on YouTube",
    description:
      "This research investigates the curriculum structures of undergraduate\nArtificial Intelligence (AI) education across universities worldwide. By\nexamining the curricula of leading universities, the research seeks to\ncontribute to a deeper understanding of AI education on a global scale,\nfacilitating the alignment of educational practices with the evolving needs of\nthe AI landscape. This research delves into the diverse course structures of\nleading universities, exploring contemporary trends and priorities to reveal\nthe nuanced approaches in AI education. It also investigates the core AI topics\nand learning contents frequently taught, comparing them with the CS2023\ncurriculum guidance to identify convergence and divergence. Additionally, it\nexamines how universities across different countries approach AI education,\nanalyzing educational objectives, priorities, potential careers, and\nmethodologies to understand the global landscape and implications of AI\npedagogy.\n",
    className: "md:col-span-2",
    icon: <IconClipboardCopy className="h-4 w-4 text-neutral-500" />,
  },
  {
    title:
      "Visions of a Discipline: Analyzing Introductory AI Courses on YouTube",
    description:
      "This research investigates the curriculum structures of undergraduate\nArtificial Intelligence (AI) education across universities worldwide. By\nexamining the curricula of leading universities, the research seeks to\ncontribute to a deeper understanding of AI education on a global scale,\nfacilitating the alignment of educational practices with the evolving needs of\nthe AI landscape. This research delves into the diverse course structures of\nleading universities, exploring contemporary trends and priorities to reveal\nthe nuanced approaches in AI education. It also investigates the core AI topics\nand learning contents frequently taught, comparing them with the CS2023\ncurriculum guidance to identify convergence and divergence. Additionally, it\nexamines how universities across different countries approach AI education,\nanalyzing educational objectives, priorities, potential careers, and\nmethodologies to understand the global landscape and implications of AI\npedagogy.\n",
    className: "md:col-span-1",
    icon: <IconFileBroken className="h-4 w-4 text-neutral-500" />,
  },
  {
    title:
      "Visions of a Discipline: Analyzing Introductory AI Courses on YouTube",
    description:
      "This research investigates the curriculum structures of undergraduate\nArtificial Intelligence (AI) education across universities worldwide. By\nexamining the curricula of leading universities, the research seeks to\ncontribute to a deeper understanding of AI education on a global scale,\nfacilitating the alignment of educational practices with the evolving needs of\nthe AI landscape. This research delves into the diverse course structures of\nleading universities, exploring contemporary trends and priorities to reveal\nthe nuanced approaches in AI education. It also investigates the core AI topics\nand learning contents frequently taught, comparing them with the CS2023\ncurriculum guidance to identify convergence and divergence. Additionally, it\nexamines how universities across different countries approach AI education,\nanalyzing educational objectives, priorities, potential careers, and\nmethodologies to understand the global landscape and implications of AI\npedagogy.\n",
    className: "md:col-span-1",
    icon: <IconSignature className="h-4 w-4 text-neutral-500" />,
  },
  {
    title:
      "Visions of a Discipline: Analyzing Introductory AI Courses on YouTube",
    description:
      "This research investigates the curriculum structures of undergraduate\nArtificial Intelligence (AI) education across universities worldwide. By\nexamining the curricula of leading universities, the research seeks to\ncontribute to a deeper understanding of AI education on a global scale,\nfacilitating the alignment of educational practices with the evolving needs of\nthe AI landscape. This research delves into the diverse course structures of\nleading universities, exploring contemporary trends and priorities to reveal\nthe nuanced approaches in AI education. It also investigates the core AI topics\nand learning contents frequently taught, comparing them with the CS2023\ncurriculum guidance to identify convergence and divergence. Additionally, it\nexamines how universities across different countries approach AI education,\nanalyzing educational objectives, priorities, potential careers, and\nmethodologies to understand the global landscape and implications of AI\npedagogy.\n",
    className: "md:col-span-2",
    icon: <IconTableColumn className="h-4 w-4 text-neutral-500" />,
  },
  {
    title:
      "Visions of a Discipline: Analyzing Introductory AI Courses on YouTube",
    description:
      "This research investigates the curriculum structures of undergraduate\nArtificial Intelligence (AI) education across universities worldwide. By\nexamining the curricula of leading universities, the research seeks to\ncontribute to a deeper understanding of AI education on a global scale,\nfacilitating the alignment of educational practices with the evolving needs of\nthe AI landscape. This research delves into the diverse course structures of\nleading universities, exploring contemporary trends and priorities to reveal\nthe nuanced approaches in AI education. It also investigates the core AI topics\nand learning contents frequently taught, comparing them with the CS2023\ncurriculum guidance to identify convergence and divergence. Additionally, it\nexamines how universities across different countries approach AI education,\nanalyzing educational objectives, priorities, potential careers, and\nmethodologies to understand the global landscape and implications of AI\npedagogy.\n",
    className: "md:col-span-2",
    icon: <IconClipboardCopy className="h-4 w-4 text-neutral-500" />,
  },
  {
    title:
      "Visions of a Discipline: Analyzing Introductory AI Courses on YouTube",
    description:
      "This research investigates the curriculum structures of undergraduate\nArtificial Intelligence (AI) education across universities worldwide. By\nexamining the curricula of leading universities, the research seeks to\ncontribute to a deeper understanding of AI education on a global scale,\nfacilitating the alignment of educational practices with the evolving needs of\nthe AI landscape. This research delves into the diverse course structures of\nleading universities, exploring contemporary trends and priorities to reveal\nthe nuanced approaches in AI education. It also investigates the core AI topics\nand learning contents frequently taught, comparing them with the CS2023\ncurriculum guidance to identify convergence and divergence. Additionally, it\nexamines how universities across different countries approach AI education,\nanalyzing educational objectives, priorities, potential careers, and\nmethodologies to understand the global landscape and implications of AI\npedagogy.\n",
    className: "md:col-span-1",
    icon: <IconFileBroken className="h-4 w-4 text-neutral-500" />,
  },
  {
    title:
      "Visions of a Discipline: Analyzing Introductory AI Courses on YouTube",
    description:
      "This research investigates the curriculum structures of undergraduate\nArtificial Intelligence (AI) education across universities worldwide. By\nexamining the curricula of leading universities, the research seeks to\ncontribute to a deeper understanding of AI education on a global scale,\nfacilitating the alignment of educational practices with the evolving needs of\nthe AI landscape. This research delves into the diverse course structures of\nleading universities, exploring contemporary trends and priorities to reveal\nthe nuanced approaches in AI education. It also investigates the core AI topics\nand learning contents frequently taught, comparing them with the CS2023\ncurriculum guidance to identify convergence and divergence. Additionally, it\nexamines how universities across different countries approach AI education,\nanalyzing educational objectives, priorities, potential careers, and\nmethodologies to understand the global landscape and implications of AI\npedagogy.\n",
    className: "md:col-span-1",
    icon: <IconSignature className="h-4 w-4 text-neutral-500" />,
  },
  {
    title:
      "Visions of a Discipline: Analyzing Introductory AI Courses on YouTube",
    description:
      "This research investigates the curriculum structures of undergraduate\nArtificial Intelligence (AI) education across universities worldwide. By\nexamining the curricula of leading universities, the research seeks to\ncontribute to a deeper understanding of AI education on a global scale,\nfacilitating the alignment of educational practices with the evolving needs of\nthe AI landscape. This research delves into the diverse course structures of\nleading universities, exploring contemporary trends and priorities to reveal\nthe nuanced approaches in AI education. It also investigates the core AI topics\nand learning contents frequently taught, comparing them with the CS2023\ncurriculum guidance to identify convergence and divergence. Additionally, it\nexamines how universities across different countries approach AI education,\nanalyzing educational objectives, priorities, potential careers, and\nmethodologies to understand the global landscape and implications of AI\npedagogy.\n",
    className: "md:col-span-2",
    icon: <IconTableColumn className="h-4 w-4 text-neutral-500" />,
  },
  {
    title:
      "Visions of a Discipline: Analyzing Introductory AI Courses on YouTube",
    description:
      "This research investigates the curriculum structures of undergraduate\nArtificial Intelligence (AI) education across universities worldwide. By\nexamining the curricula of leading universities, the research seeks to\ncontribute to a deeper understanding of AI education on a global scale,\nfacilitating the alignment of educational practices with the evolving needs of\nthe AI landscape. This research delves into the diverse course structures of\nleading universities, exploring contemporary trends and priorities to reveal\nthe nuanced approaches in AI education. It also investigates the core AI topics\nand learning contents frequently taught, comparing them with the CS2023\ncurriculum guidance to identify convergence and divergence. Additionally, it\nexamines how universities across different countries approach AI education,\nanalyzing educational objectives, priorities, potential careers, and\nmethodologies to understand the global landscape and implications of AI\npedagogy.\n",
    className: "md:col-span-2",
    icon: <IconClipboardCopy className="h-4 w-4 text-neutral-500" />,
  },
  {
    title:
      "Visions of a Discipline: Analyzing Introductory AI Courses on YouTube",
    description:
      "This research investigates the curriculum structures of undergraduate\nArtificial Intelligence (AI) education across universities worldwide. By\nexamining the curricula of leading universities, the research seeks to\ncontribute to a deeper understanding of AI education on a global scale,\nfacilitating the alignment of educational practices with the evolving needs of\nthe AI landscape. This research delves into the diverse course structures of\nleading universities, exploring contemporary trends and priorities to reveal\nthe nuanced approaches in AI education. It also investigates the core AI topics\nand learning contents frequently taught, comparing them with the CS2023\ncurriculum guidance to identify convergence and divergence. Additionally, it\nexamines how universities across different countries approach AI education,\nanalyzing educational objectives, priorities, potential careers, and\nmethodologies to understand the global landscape and implications of AI\npedagogy.\n",
    className: "md:col-span-1",
    icon: <IconFileBroken className="h-4 w-4 text-neutral-500" />,
  },
  {
    title:
      "Visions of a Discipline: Analyzing Introductory AI Courses on YouTube",
    description:
      "This research investigates the curriculum structures of undergraduate\nArtificial Intelligence (AI) education across universities worldwide. By\nexamining the curricula of leading universities, the research seeks to\ncontribute to a deeper understanding of AI education on a global scale,\nfacilitating the alignment of educational practices with the evolving needs of\nthe AI landscape. This research delves into the diverse course structures of\nleading universities, exploring contemporary trends and priorities to reveal\nthe nuanced approaches in AI education. It also investigates the core AI topics\nand learning contents frequently taught, comparing them with the CS2023\ncurriculum guidance to identify convergence and divergence. Additionally, it\nexamines how universities across different countries approach AI education,\nanalyzing educational objectives, priorities, potential careers, and\nmethodologies to understand the global landscape and implications of AI\npedagogy.\n",
    className: "md:col-span-1",
    icon: <IconSignature className="h-4 w-4 text-neutral-500" />,
  },
  {
    title:
      "Visions of a Discipline: Analyzing Introductory AI Courses on YouTube",
    description:
      "This research investigates the curriculum structures of undergraduate\nArtificial Intelligence (AI) education across universities worldwide. By\nexamining the curricula of leading universities, the research seeks to\ncontribute to a deeper understanding of AI education on a global scale,\nfacilitating the alignment of educational practices with the evolving needs of\nthe AI landscape. This research delves into the diverse course structures of\nleading universities, exploring contemporary trends and priorities to reveal\nthe nuanced approaches in AI education. It also investigates the core AI topics\nand learning contents frequently taught, comparing them with the CS2023\ncurriculum guidance to identify convergence and divergence. Additionally, it\nexamines how universities across different countries approach AI education,\nanalyzing educational objectives, priorities, potential careers, and\nmethodologies to understand the global landscape and implications of AI\npedagogy.\n",
    className: "md:col-span-2",
    icon: <IconTableColumn className="h-4 w-4 text-neutral-500" />,
  },
  {
    title:
      "Visions of a Discipline: Analyzing Introductory AI Courses on YouTube",
    description:
      "This research investigates the curriculum structures of undergraduate\nArtificial Intelligence (AI) education across universities worldwide. By\nexamining the curricula of leading universities, the research seeks to\ncontribute to a deeper understanding of AI education on a global scale,\nfacilitating the alignment of educational practices with the evolving needs of\nthe AI landscape. This research delves into the diverse course structures of\nleading universities, exploring contemporary trends and priorities to reveal\nthe nuanced approaches in AI education. It also investigates the core AI topics\nand learning contents frequently taught, comparing them with the CS2023\ncurriculum guidance to identify convergence and divergence. Additionally, it\nexamines how universities across different countries approach AI education,\nanalyzing educational objectives, priorities, potential careers, and\nmethodologies to understand the global landscape and implications of AI\npedagogy.\n",
    className: "md:col-span-2",
    icon: <IconClipboardCopy className="h-4 w-4 text-neutral-500" />,
  },
  {
    title:
      "Visions of a Discipline: Analyzing Introductory AI Courses on YouTube",
    description:
      "This research investigates the curriculum structures of undergraduate\nArtificial Intelligence (AI) education across universities worldwide. By\nexamining the curricula of leading universities, the research seeks to\ncontribute to a deeper understanding of AI education on a global scale,\nfacilitating the alignment of educational practices with the evolving needs of\nthe AI landscape. This research delves into the diverse course structures of\nleading universities, exploring contemporary trends and priorities to reveal\nthe nuanced approaches in AI education. It also investigates the core AI topics\nand learning contents frequently taught, comparing them with the CS2023\ncurriculum guidance to identify convergence and divergence. Additionally, it\nexamines how universities across different countries approach AI education,\nanalyzing educational objectives, priorities, potential careers, and\nmethodologies to understand the global landscape and implications of AI\npedagogy.\n",
    className: "md:col-span-1",
    icon: <IconFileBroken className="h-4 w-4 text-neutral-500" />,
  },
  {
    title:
      "Visions of a Discipline: Analyzing Introductory AI Courses on YouTube",
    description:
      "This research investigates the curriculum structures of undergraduate\nArtificial Intelligence (AI) education across universities worldwide. By\nexamining the curricula of leading universities, the research seeks to\ncontribute to a deeper understanding of AI education on a global scale,\nfacilitating the alignment of educational practices with the evolving needs of\nthe AI landscape. This research delves into the diverse course structures of\nleading universities, exploring contemporary trends and priorities to reveal\nthe nuanced approaches in AI education. It also investigates the core AI topics\nand learning contents frequently taught, comparing them with the CS2023\ncurriculum guidance to identify convergence and divergence. Additionally, it\nexamines how universities across different countries approach AI education,\nanalyzing educational objectives, priorities, potential careers, and\nmethodologies to understand the global landscape and implications of AI\npedagogy.\n",
    className: "md:col-span-1",
    icon: <IconSignature className="h-4 w-4 text-neutral-500" />,
  },
  {
    title:
      "Visions of a Discipline: Analyzing Introductory AI Courses on YouTube",
    description:
      "This research investigates the curriculum structures of undergraduate\nArtificial Intelligence (AI) education across universities worldwide. By\nexamining the curricula of leading universities, the research seeks to\ncontribute to a deeper understanding of AI education on a global scale,\nfacilitating the alignment of educational practices with the evolving needs of\nthe AI landscape. This research delves into the diverse course structures of\nleading universities, exploring contemporary trends and priorities to reveal\nthe nuanced approaches in AI education. It also investigates the core AI topics\nand learning contents frequently taught, comparing them with the CS2023\ncurriculum guidance to identify convergence and divergence. Additionally, it\nexamines how universities across different countries approach AI education,\nanalyzing educational objectives, priorities, potential careers, and\nmethodologies to understand the global landscape and implications of AI\npedagogy.\n",
    className: "md:col-span-2",
    icon: <IconTableColumn className="h-4 w-4 text-neutral-500" />,
  },
  {
    title:
      "Visions of a Discipline: Analyzing Introductory AI Courses on YouTube",
    description:
      "This research investigates the curriculum structures of undergraduate\nArtificial Intelligence (AI) education across universities worldwide. By\nexamining the curricula of leading universities, the research seeks to\ncontribute to a deeper understanding of AI education on a global scale,\nfacilitating the alignment of educational practices with the evolving needs of\nthe AI landscape. This research delves into the diverse course structures of\nleading universities, exploring contemporary trends and priorities to reveal\nthe nuanced approaches in AI education. It also investigates the core AI topics\nand learning contents frequently taught, comparing them with the CS2023\ncurriculum guidance to identify convergence and divergence. Additionally, it\nexamines how universities across different countries approach AI education,\nanalyzing educational objectives, priorities, potential careers, and\nmethodologies to understand the global landscape and implications of AI\npedagogy.\n",
    className: "md:col-span-2",
    icon: <IconClipboardCopy className="h-4 w-4 text-neutral-500" />,
  },
  {
    title:
      "Visions of a Discipline: Analyzing Introductory AI Courses on YouTube",
    description:
      "This research investigates the curriculum structures of undergraduate\nArtificial Intelligence (AI) education across universities worldwide. By\nexamining the curricula of leading universities, the research seeks to\ncontribute to a deeper understanding of AI education on a global scale,\nfacilitating the alignment of educational practices with the evolving needs of\nthe AI landscape. This research delves into the diverse course structures of\nleading universities, exploring contemporary trends and priorities to reveal\nthe nuanced approaches in AI education. It also investigates the core AI topics\nand learning contents frequently taught, comparing them with the CS2023\ncurriculum guidance to identify convergence and divergence. Additionally, it\nexamines how universities across different countries approach AI education,\nanalyzing educational objectives, priorities, potential careers, and\nmethodologies to understand the global landscape and implications of AI\npedagogy.\n",
    className: "md:col-span-1",
    icon: <IconFileBroken className="h-4 w-4 text-neutral-500" />,
  },
  {
    title:
      "Visions of a Discipline: Analyzing Introductory AI Courses on YouTube",
    description:
      "This research investigates the curriculum structures of undergraduate\nArtificial Intelligence (AI) education across universities worldwide. By\nexamining the curricula of leading universities, the research seeks to\ncontribute to a deeper understanding of AI education on a global scale,\nfacilitating the alignment of educational practices with the evolving needs of\nthe AI landscape. This research delves into the diverse course structures of\nleading universities, exploring contemporary trends and priorities to reveal\nthe nuanced approaches in AI education. It also investigates the core AI topics\nand learning contents frequently taught, comparing them with the CS2023\ncurriculum guidance to identify convergence and divergence. Additionally, it\nexamines how universities across different countries approach AI education,\nanalyzing educational objectives, priorities, potential careers, and\nmethodologies to understand the global landscape and implications of AI\npedagogy.\n",
    className: "md:col-span-1",
    icon: <IconSignature className="h-4 w-4 text-neutral-500" />,
  },
  {
    title:
      "Visions of a Discipline: Analyzing Introductory AI Courses on YouTube",
    description:
      "This research investigates the curriculum structures of undergraduate\nArtificial Intelligence (AI) education across universities worldwide. By\nexamining the curricula of leading universities, the research seeks to\ncontribute to a deeper understanding of AI education on a global scale,\nfacilitating the alignment of educational practices with the evolving needs of\nthe AI landscape. This research delves into the diverse course structures of\nleading universities, exploring contemporary trends and priorities to reveal\nthe nuanced approaches in AI education. It also investigates the core AI topics\nand learning contents frequently taught, comparing them with the CS2023\ncurriculum guidance to identify convergence and divergence. Additionally, it\nexamines how universities across different countries approach AI education,\nanalyzing educational objectives, priorities, potential careers, and\nmethodologies to understand the global landscape and implications of AI\npedagogy.\n",
    className: "md:col-span-2",
    icon: <IconTableColumn className="h-4 w-4 text-neutral-500" />,
  },
];
