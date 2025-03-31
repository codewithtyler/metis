import React from 'react';
import { Pencil, Trash2, Copy, Box } from 'lucide-react';
import { Category } from '../../types';

interface CategoryTableProps {
  categories: Category[];
  onEdit: (category: Category) => void;
  onDelete: (category: Category) => void;
  onDuplicate: (category: Category) => void;
  onToggleEnabled: (categoryId: string) => void;
  onManageProducts: (category: Category) => void;
}

export default function CategoryTable({
  categories,
  onEdit,
  onDelete,
  onDuplicate,
  onToggleEnabled,
  onManageProducts,
}: CategoryTableProps) {
  return (
    <div className="bg-dark-800 shadow-lg rounded-lg border border-dark-700">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-dark-700">
          <thead className="bg-dark-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-dark-300 uppercase tracking-wider">
                Category Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-dark-300 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-dark-300 uppercase tracking-wider">
                Products
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-dark-300 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-dark-800 divide-y divide-dark-700">
            {categories.map((category) => (
              <tr key={category.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-dark-100">
                  <div className="flex items-center">
                    {category.name}
                    {category.isDefault && (
                      <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-primary/10 text-primary">
                        Default
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <button
                    onClick={() => onToggleEnabled(category.id)}
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      category.isEnabled
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {category.isEnabled ? 'Enabled' : 'Disabled'}
                  </button>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-dark-300">
                  <button
                    onClick={() => onManageProducts(category)}
                    className="inline-flex items-center text-dark-300 hover:text-dark-100"
                  >
                    <Box className="h-4 w-4 mr-1" />
                    {category.productIds?.length || 0} Products
                  </button>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => onDuplicate(category)}
                    className="text-dark-300 hover:text-dark-100 mr-4"
                    title="Duplicate category"
                  >
                    <Copy className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => onEdit(category)}
                    className="text-dark-300 hover:text-dark-100 mr-4"
                  >
                    <Pencil className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => onDelete(category)}
                    className="text-dark-300 hover:text-error"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}