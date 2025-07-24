export function MetricsList({ title, items, renderItem }) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
        <div className="space-y-3">
          {items.map((item, index) => renderItem(item, index))}
        </div>
      </div>
    );
  }