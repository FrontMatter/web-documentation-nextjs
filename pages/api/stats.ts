import type { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "@supabase/supabase-js";

export const config = {
  runtime: "edge",
};

interface Database {
  public: {
    Tables: {
      movies: {
        Row: {
          name: string;
          extName: string;
          version: string;
          date: string;
          count: number;
        };
        Insert: {}; // The data expected passed to an "insert" statement.
        Update: {}; // The data expected passed to an "update" statement.
      };
    };
  };
}

const api = async (req: NextApiRequest, res: NextApiResponse) => {
  if (!process.env.SUPABASE_METRICS_URL || !process.env.SUPABASE_METRICS_KEY) {
    return res.status(200).send({});
  }

  // Get days from query
  const days = req.query.days ? parseInt(req.query.days as string) : 7;
  const crntDate = new Date();
  crntDate.setDate(crntDate.getDate() - days);
  const fromDate = crntDate.toISOString().slice(0, 10);

  const supabase = createClient<Database>(
    process.env.SUPABASE_METRICS_URL,
    process.env.SUPABASE_METRICS_KEY
  );

  const statistics: any = {
    fromDate: fromDate,
    activate: {
      beta: {},
      stable: {},
    },
    webviews: {},
    events: {},
    versions: {},
  };

  try {
    // Select the record for today dd/MM/yyyy
    const activateRecords = await supabase
      .from("metrics")
      .select(`extName,name,version,count,date`)
      .gte("date", fromDate);

    if (activateRecords.data) {
      for (const record of activateRecords.data) {
        // Split the activate events
        if (record.name === "activate") {
          // Record the version
          if (!statistics.versions[record.version]) {
            statistics.versions[record.version] = 0;
          }
          statistics.versions[record.version] += record.count;

          // Record the number of beta/stable activations
          if (record.extName.includes("beta")) {
            if (!statistics.activate.beta[record.date]) {
              statistics.activate.beta[record.date] = 0;
            }
            statistics.activate.beta[record.date] += record.count;
          } else {
            if (!statistics.activate.stable[record.date]) {
              statistics.activate.stable[record.date] = 0;
            }
            statistics.activate.stable[record.date] += record.count;
          }
        } else if (record.name.startsWith(`webview`)) {
          if (!statistics.webviews[record.date]) {
            statistics.webviews[record.date] = {};
          }

          if (!statistics.webviews[record.date][record.name]) {
            statistics.webviews[record.date][record.name] = 0;
          }

          statistics.webviews[record.date][record.name] += record.count;
        } else {
          if (!statistics.events[record.date]) {
            statistics.events[record.date] = {};
          }

          if (!statistics.events[record.date][record.name]) {
            statistics.events[record.date][record.name] = 0;
          }

          statistics.events[record.date][record.name] += record.count;
        }
      }
    }
  } catch (error) {
    // Noop
  }

  res.status(201).send(statistics);
};

export default api;
