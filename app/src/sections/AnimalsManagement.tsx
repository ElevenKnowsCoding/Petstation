import { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Plus, X, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';
import { animals } from '@/data/mockData';
import type { Animal } from '@/types';

const statusColors = {
  healthy: 'bg-green-100 text-green-700',
  'under-care': 'bg-yellow-100 text-yellow-700',
  quarantine: 'bg-red-100 text-red-700',
};

function getToucanUrl(channelId: string) {
  return `${window.location.origin}/toucan/${channelId}`;
}

export function AnimalsManagement() {
  const [selectedAnimal, setSelectedAnimal] = useState<Animal | null>(null);
  const [activeTab, setActiveTab] = useState<'list' | 'qr'>('list');

  return (
    <div className="space-y-6 animate-slide-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Channel Build Toucan</h2>
          <p className="text-muted-foreground">Scan QR codes to view toucan dashboards</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-package-blue hover:bg-package-light-blue transition-colors self-start">
          <Plus className="w-4 h-4" />
          <span className="text-sm font-medium">Add Entry</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 bg-muted p-1 rounded-xl w-fit">
        {(['list', 'qr'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              'px-4 py-2 rounded-lg text-sm font-medium transition-colors',
              activeTab === tab ? 'bg-white shadow-sm' : 'text-muted-foreground hover:text-foreground'
            )}
          >
            {tab === 'list' ? 'List' : 'QR Codes'}
          </button>
        ))}
      </div>

      {/* List Tab */}
      {activeTab === 'list' && (
        <div className="bg-white rounded-2xl border border-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted">
                <tr>
                  <th className="text-left px-4 py-3 text-sm font-semibold">#</th>
                  <th className="text-left px-4 py-3 text-sm font-semibold">Type</th>
                  <th className="text-left px-4 py-3 text-sm font-semibold">Channel ID</th>
                  <th className="text-left px-4 py-3 text-sm font-semibold">Status</th>
                  <th className="text-left px-4 py-3 text-sm font-semibold">Dashboard URL</th>
                  <th className="text-left px-4 py-3 text-sm font-semibold">QR</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {animals.map((animal, index) => (
                  <tr key={animal.id} className="hover:bg-muted/50 transition-colors">
                    <td className="px-4 py-3 text-sm text-muted-foreground">{index + 1}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <span className="text-xl">🦜</span>
                        <span className="font-medium text-sm">Channel Build Toucan</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <code className="text-xs bg-muted px-2 py-1 rounded">{animal.channelId}</code>
                    </td>
                    <td className="px-4 py-3">
                      <span className={cn('px-2.5 py-1 rounded-full text-xs font-semibold capitalize', statusColors[animal.status])}>
                        {animal.status.replace('-', ' ')}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <a
                        href={getToucanUrl(animal.channelId)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-xs text-primary hover:underline"
                      >
                        <ExternalLink className="w-3 h-3" />
                        /toucan/{animal.channelId}
                      </a>
                    </td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => setSelectedAnimal(animal)}
                        className="p-1.5 rounded-lg bg-muted hover:bg-package-blue transition-colors"
                      >
                        <QRCodeSVG value={getToucanUrl(animal.channelId)} size={32} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-4 py-3 border-t border-border">
            <p className="text-sm text-muted-foreground">{animals.length} entries</p>
          </div>
        </div>
      )}

      {/* QR Codes Tab */}
      {activeTab === 'qr' && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {animals.map((animal) => (
            <div
              key={animal.id}
              className="bg-white rounded-2xl border border-border p-5 flex flex-col items-center gap-3 hover:shadow-card-hover transition-shadow cursor-pointer"
              onClick={() => setSelectedAnimal(animal)}
            >
              <span className="text-3xl">🦜</span>
              <div className="text-center">
                <p className="font-semibold text-sm">Channel Build Toucan</p>
                <code className="text-xs text-muted-foreground">{animal.channelId}</code>
              </div>
              <QRCodeSVG
                value={getToucanUrl(animal.channelId)}
                size={120}
                includeMargin
              />
              <span className={cn('px-2.5 py-0.5 rounded-full text-xs font-semibold capitalize', statusColors[animal.status])}>
                {animal.status.replace('-', ' ')}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* QR Modal */}
      {selectedAnimal && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedAnimal(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-sm w-full animate-scale-in p-6 space-y-4"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🦜</span>
                <div>
                  <p className="font-bold">Channel Build Toucan</p>
                  <code className="text-xs text-muted-foreground">{selectedAnimal.channelId}</code>
                </div>
              </div>
              <button onClick={() => setSelectedAnimal(null)} className="p-1.5 rounded-lg hover:bg-muted transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex flex-col items-center gap-3 py-2">
              <QRCodeSVG
                value={getToucanUrl(selectedAnimal.channelId)}
                size={200}
                includeMargin
                level="H"
              />
              <p className="text-xs text-muted-foreground text-center break-all">
                {getToucanUrl(selectedAnimal.channelId)}
              </p>
            </div>

            <div className="flex gap-2">
              <span className={cn('px-2.5 py-1 rounded-full text-xs font-semibold capitalize', statusColors[selectedAnimal.status])}>
                {selectedAnimal.status.replace('-', ' ')}
              </span>
              <a
                href={getToucanUrl(selectedAnimal.channelId)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-package-blue hover:bg-package-light-blue transition-colors"
              >
                <ExternalLink className="w-3 h-3" />
                Open Dashboard
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
