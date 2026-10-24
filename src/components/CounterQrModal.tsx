import React, { useEffect, useState } from 'react';
import QRCode from 'qrcode';
import { X, QrCode, Copy, Check, ExternalLink, Download } from 'lucide-react';
import { GOOGLE_REVIEW_URL } from '../data/reviews';

interface CounterQrModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CounterQrModal: React.FC<CounterQrModalProps> = ({ isOpen, onClose }) => {
  const [appQrDataUrl, setAppQrDataUrl] = useState<string>('');
  const [googleQrDataUrl, setGoogleQrDataUrl] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'app' | 'direct'>('app');
  const [copied, setCopied] = useState(false);

  const currentAppUrl = typeof window !== 'undefined' ? window.location.href : '';

  useEffect(() => {
    if (!isOpen) return;

    // Generate QR for this automation app
    if (currentAppUrl) {
      QRCode.toDataURL(currentAppUrl, {
        width: 320,
        margin: 2,
        color: {
          dark: '#0f172a',
          light: '#ffffff',
        },
      }).then(setAppQrDataUrl).catch(console.error);
    }

    // Generate QR directly for Google Review URL
    QRCode.toDataURL(GOOGLE_REVIEW_URL, {
      width: 320,
      margin: 2,
      color: {
        dark: '#1a73e8',
        light: '#ffffff',
      },
    }).then(setGoogleQrDataUrl).catch(console.error);
  }, [isOpen, currentAppUrl]);

  if (!isOpen) return null;

  const currentUrl = activeTab === 'app' ? currentAppUrl : GOOGLE_REVIEW_URL;
  const currentQr = activeTab === 'app' ? appQrDataUrl : googleQrDataUrl;

  const handleCopyLink = () => {
    try {
      const textarea = document.createElement('textarea');
      textarea.value = currentUrl;
      textarea.style.position = 'fixed';
      textarea.style.left = '-9999px';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
    } catch {}
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadQr = () => {
    if (!currentQr) return;
    const a = document.createElement('a');
    a.href = currentQr;
    a.download = activeTab === 'app' ? 'DIPS-Reviews-App-QR.png' : 'DIPS-Direct-Google-Review-QR.png';
    a.click();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-sm bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-2xl text-slate-100">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-3">
          <div className="p-2 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
            <QrCode className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-base text-slate-100">काउंटर QR कोड</h3>
            <p className="text-xs text-slate-400">ग्राहकांना मोबाईलवर स्कॅन करायला द्या</p>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex p-1 bg-slate-950/80 rounded-xl mb-4 border border-slate-800/80 text-xs font-medium">
          <button
            onClick={() => setActiveTab('app')}
            className={`flex-1 py-2 px-3 rounded-lg transition-all ${
              activeTab === 'app'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            📱 रिव्ह्यू ॲप QR
          </button>
          <button
            onClick={() => setActiveTab('direct')}
            className={`flex-1 py-2 px-3 rounded-lg transition-all ${
              activeTab === 'direct'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            ⭐ डायरेक्ट गुगल QR
          </button>
        </div>

        {/* QR Code Container */}
        <div className="flex flex-col items-center justify-center bg-white p-5 rounded-2xl shadow-inner mb-4">
          {currentQr ? (
            <img
              src={currentQr}
              alt="DIPS QR Code"
              className="w-52 h-52 object-contain rounded-lg"
            />
          ) : (
            <div className="w-52 h-52 flex items-center justify-center text-slate-400 text-xs">
              QR तयार होत आहे...
            </div>
          )}
          <div className="mt-2 text-center text-slate-900 font-bold text-xs tracking-wide">
            {activeTab === 'app'
              ? 'DIPS रिव्ह्यू ऑटोमेशन सिस्टीम'
              : 'DIPS Computers, शिरपूर जैन (गुगल रिव्ह्यू)'}
          </div>
          <div className="text-[10px] text-slate-500 mt-0.5">
            कोणत्याही कॅमेऱ्याने किंवा GPay/PhonePe ने स्कॅन करा
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={handleCopyLink}
            className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-200 transition-colors border border-slate-700"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'कॉपी झाले!' : 'लिंक कॉपी'}</span>
          </button>
          <button
            onClick={handleDownloadQr}
            className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-xs font-semibold text-white transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>QR डाऊनलोड</span>
          </button>
        </div>

        <div className="mt-3 text-center">
          <a
            href={GOOGLE_REVIEW_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-[11px] text-blue-400 hover:underline"
          >
            गुगल रिव्ह्यू लिंक तपासा <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </div>
  );
};
