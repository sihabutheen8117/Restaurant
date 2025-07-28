import { Download } from 'lucide-react';

export function ExportButton({ onExport, loading = false, format = 'CSV' }) {
  return (
    <button
      onClick={onExport}
      disabled={loading}
      className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
    >
      <Download className="h-4 w-4 mr-2" />
      {loading ? 'Exporting...' : `Export ${format}`}
    </button>
  );
}
