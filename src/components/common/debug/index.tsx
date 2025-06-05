import React from 'react';

import serverClientFactory from '@/http/server';

type ServerData = {
  value: string;
  serverTimestamp: string;
};

export default async function CacheDebug() {
  const data = await serverClientFactory<ServerData>({
    url: '/example/data',
    method: 'get',
  });

  return (
    <div className="max-w-md space-y-2 rounded-xl border bg-gray-100 p-4 text-sm">
      <div>
        <strong>Valor:</strong> {data.value}
      </div>
      <div>
        <strong>Gerado em:</strong> {new Date(data.serverTimestamp).toLocaleTimeString()}
      </div>
      <div className="text-xs text-gray-500">
        Esse dado veio do cache se foi carregado sem log no servidor.
      </div>
    </div>
  );
}
