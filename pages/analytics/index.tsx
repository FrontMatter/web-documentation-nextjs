import React, { useEffect, useMemo, useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { Analytics } from '../../models';

const Charts = () => {
  const [stats, setStats] = useState<Analytics | null>(null);

  const getStats = async () => {
    const res = await fetch('/api/stats');
    const json = await res.json();
    setStats(json);
  };

  const processData = (data: any) => {
    const result: {
      date: string;
      [event: string]: string | number;
    }[] = [];

    if (data) {
      for (const date in data) {
        let dateObj = result.find((d) => d.date === date);
        if (dateObj) {
          dateObj = {
            ...dateObj,
            ...data[date]
          };
        } else {
          result.push({
            date,
            ...data[date],
          });
        }
      }
    }

    // Sort by date
    result.sort((a, b) => {
      const aDate = new Date(a.date);
      const bDate = new Date(b.date);
      return aDate.getTime() - bDate.getTime();
    });

    return result;
  };

  const processKeys = (data: any) => {
    const result: string[] = [];
    for (const value of data) {
      const keys = Object.keys(value).filter((key) => key !== 'date');
      for (const key of keys) {
        if (!result.includes(key)) {
          result.push(key);
        }
      }
    }
    return result;
  };

  const activateData = useMemo(() => {
    const result: {
      date: string;
      [prop: string]: string | number;
    }[] = [];

    if (stats?.activate) {
      for (const extType in stats.activate) {
        const ext = stats?.activate[extType as keyof typeof stats.activate];
        for (const date in ext) {
          const dateObj = result.find((d) => d.date === date);
          if (dateObj) {
            dateObj[extType] = ext[date];
          } else {
            result.push({
              date,
              beta: 0,
              stable: 0,
              [extType]: ext[date] as number,
            });
          }
        }
      }
    }

    // Sort by date
    result.sort((a, b) => {
      const aDate = new Date(a.date);
      const bDate = new Date(b.date);
      return aDate.getTime() - bDate.getTime();
    });

    return result;
  }, [stats]);

  const webviewsData = useMemo(() => {
    return processData(stats?.webviews);
  }, [stats?.webviews]);

  const eventsData = useMemo(() => {
    return processData(stats?.events);
  }, [stats?.events]);

  const versionData = useMemo(() => {
    const results: {
      version: string;
      count: number;
    }[] = [];

    if (stats?.versions) {
      for (const version of Object.keys(stats.versions)) {
        results.push({
          version,
          count: stats.versions[version],
        });
      }
    }

    // Sort by version
    results.sort((a, b) => {
      const aVersion = a.version.split('.');
      const bVersion = b.version.split('.');
      for (let i = 0; i < aVersion.length; i++) {
        if (aVersion[i] !== bVersion[i]) {
          return parseInt(aVersion[i]) - parseInt(bVersion[i]);
        }
      }
      return 0;
    });

    return results;
  }, [stats]);

  const getWebviewIds = useMemo(() => {
    return processKeys(webviewsData);
  }, [webviewsData]);

  const getEventIds = useMemo(() => {
    return processKeys(eventsData);
  }, [eventsData]);

  useEffect(() => {
    getStats();
  }, []);

  return (
    <div>
      <h1>Front Matter CMS - Analytics</h1>
      <h2>Activate</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={activateData}>
          <CartesianGrid strokeDasharray="5 5" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="beta" fill="#8884d8" />
          <Bar dataKey="stable" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>

      <h2>Webviews</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={webviewsData}>
          <CartesianGrid strokeDasharray="5 5" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          {getWebviewIds.map((key, index) => (
            <Bar key={key} dataKey={key} fill={`#${Math.floor(Math.random() * 16777215).toString(16)}`} />
          ))}
        </BarChart>
      </ResponsiveContainer>

      <h2>Events</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={eventsData}>
          <CartesianGrid strokeDasharray="5 5" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          {getEventIds.map((key, index) => (
            <Bar key={key} dataKey={key} fill={`#${Math.floor(Math.random() * 16777215).toString(16)}`} />
          ))}
        </BarChart>
      </ResponsiveContainer>

      <h2>Versions</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={versionData}>
          <CartesianGrid strokeDasharray="5 5" />
          <XAxis dataKey="version" />
          <YAxis dataKey="count" />
          <Tooltip />
          <Legend />
          <Bar dataKey="count" fill={`#${Math.floor(Math.random() * 16777215).toString(16)}`} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Charts;