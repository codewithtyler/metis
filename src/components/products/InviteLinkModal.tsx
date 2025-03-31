import React from 'react';
import { X } from 'lucide-react';
import { Product } from '../../types';

interface InviteLinkModalProps {
  product: Product;
  inviteLink: string;
  onClose: () => void;
}

export default function InviteLinkModal({
  product,
  inviteLink,
  onClose,
}: InviteLinkModalProps) {
  return (
    <div className="fixed inset-0 bg-dark-900/75 flex items-center justify-center">
      <div className="bg-dark-800 rounded-lg p-8 max-w-md w-full border border-dark-700">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-medium text-dark-100">Invite Link</h3>
          <button
            onClick={onClose}
            className="text-dark-400 hover:text-dark-300"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium text-dark-200 mb-2">
            Share this link to invite users:
          </label>
          <div className="flex">
            <input
              type="text"
              readOnly
              value={inviteLink}
              className="flex-1 px-3 py-2 bg-dark-700 border border-dark-600 rounded-l-lg text-sm text-dark-100"
            />
            <button
              onClick={() => {
                navigator.clipboard.writeText(inviteLink);
              }}
              className="px-4 py-2 bg-primary border border-transparent rounded-r-lg text-sm font-medium text-white hover:bg-primary-hover"
            >
              Copy
            </button>
          </div>
        </div>
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-dark-600 rounded-lg text-sm font-medium text-dark-200 bg-dark-800 hover:bg-dark-700"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}