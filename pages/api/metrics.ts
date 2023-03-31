import type { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "@supabase/supabase-js";

const api = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(405).send({});
  }

  if (!process.env.SUPABASE_METRICS_URL || !process.env.SUPABASE_METRICS_KEY) {
    return res.status(200).send({});
  }

  const supabase = createClient(
    process.env.SUPABASE_METRICS_URL,
    process.env.SUPABASE_METRICS_KEY
  );

  const metrics: {
    name: string;
    extName: string;
    version: string;
    properties: any;
  }[] = req.body;

  if (!metrics) {
    return res.status(400).send({});
  }

  for (const metric of metrics) {
    if (!metric.name || !metric.version) {
      continue;
    }

    try {
      // Select the record for today dd/MM/yyyy
      const record = await supabase
        .from("metrics")
        .select()
        .eq("name", metric.name)
        .eq("extName", metric.extName)
        .eq("version", metric.version)
        .eq("date", new Date().toISOString().slice(0, 10))
        .single();

      // If there is no record for today, create one
      if (!record.data) {
        await supabase.from("metrics").insert([
          {
            name: metric.name,
            extName: metric.extName,
            version: metric.version,
            date: new Date().toISOString().slice(0, 10),
            properties: metric.properties,
            count: 1,
          },
        ]);
      } else {
        // If there is a record for today, update it
        await supabase
          .from("metrics")
          .update({ count: record.data.count + 1 })
          .eq("name", metric.name)
          .eq("extName", metric.extName)
          .eq("version", metric.version)
          .eq("date", new Date().toISOString().slice(0, 10));
      }
    } catch (error) {
      // Noop
    }
  }

  res.status(201).send({});
};

export default api;
