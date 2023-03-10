import { NextResponse } from "next/server";
import type { NextFetchEvent, NextRequest } from "next/server";
import { fetchEventSource } from "@microsoft/fetch-event-source";

export const config = {
  runtime: "edge",
};

export default async function MyEdgeFunction(
  request: NextRequest,
  context: NextFetchEvent
) {
  const aiUrl = process.env.MENDABLE_ANON_URL;

  if (request.method !== "POST") {
    return NextResponse.json(
      {},
      {
        status: 405,
        statusText: "Method Not Allowed",
      }
    );
  }

  const chatData: { company: string; chatId: string; question: string } =
    await new Response(request.body).json();
  if (!chatData.chatId || !chatData.company || !chatData.question) {
    return NextResponse.json(
      {},
      {
        status: 400,
        statusText: "Bad Request",
      }
    );
  }

  const customReadable = new ReadableStream({
    start(controller) {
      fetchEventSource(`${aiUrl}/qaChat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
        body: JSON.stringify({
          company: chatData.company,
          conversation_id: chatData.chatId,
          history: [{ prompt: "", response: "", sources: [] }],
          question: chatData.question,
        }),
        onmessage: (event) => {
          const data = JSON.parse(event.data);

          controller.enqueue({ data: JSON.stringify(data) });
        },
        onclose: () => {
          controller.close();
        },
      });
    },
  });

  return new Response(customReadable, {
    headers: { "Content-Type": "text/event-stream" },
  });
}
