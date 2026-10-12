import React, { useState, useEffect } from 'react';
import {
  X,
  Shield,
  Lock,
  Smartphone,
  Eye,
  EyeOff,
  CheckCircle2,
  AlertTriangle,
  Fingerprint,
  HardDrive,
  Download,
  Trash2,
  RefreshCw,
  LogOut,
  Laptop,
  Check,
  ChevronRight,
  Globe,
  Camera,
  Timer,
  Cloud,
  FileText,
  KeyRound,
  History,
  Radio,
  Sliders,
  ShieldCheck,
  ShieldAlert,
} from 'lucide-react';

interface PrivacySecurityModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectsCount?: number;
  favoritesCount?: number;
  onClearAllData?: () => void;
}

interface PrivacySettings {
  twoFactorEnabled: boolean;
  twoFactorMethod: 'authenticator' | 'sms';
  biometricEnabled: boolean;
  autoLockDuration: 'immediate' | '5m' | '15m' | '1h' | 'never';
  stripExifData: boolean;
  optOutAiTraining: boolean;
  watermarkDownloads: boolean;
  profileVisibility: 'public' | 'private';
  showFavoritesPublicly: boolean;
  promptRetention: 'forever' | '30days' | 'ephemeral';
  activityStatusBroadcast: boolean;
  cloudBackupProvider: 'none' | 'google_drive' | 'icloud' | 'dropbox';
  crashTelemetryEnabled: boolean;
  defaultProjectPrivacy: 'private' | 'unlisted' | 'public';
}

const DEFAULT_SETTINGS: PrivacySettings = {
  twoFactorEnabled: true,
  twoFactorMethod: 'authenticator',
  biometricEnabled: true,
  autoLockDuration: '15m',
  stripExifData: true,
  optOutAiTraining: true,
  watermarkDownloads: true,
  profileVisibility: 'private',
  showFavoritesPublicly: false,
  promptRetention: '30days',
  activityStatusBroadcast: false,
  cloudBackupProvider: 'none',
  crashTelemetryEnabled: false,
  defaultProjectPrivacy: 'private',
};

export const PrivacySecurityModal: React.FC<PrivacySecurityModalProps> = ({
  isOpen,
  onClose,
  projectsCount = 0,
  favoritesCount = 0,
  onClearAllData,
}) => {
  const [activeTab, setActiveTab] = useState<'security' | 'privacy' | 'data'>('security');
  const [settings, setSettings] = useState<PrivacySettings>(() => {
    const saved = localStorage.getItem('desing_ai_privacy_settings_v4');
    if (saved) {
      try {
        return { ...DEFAULT_SETTINGS, ...JSON.parse(saved) };
      } catch {
        return DEFAULT_SETTINGS;
      }
    }
    return DEFAULT_SETTINGS;
  });

  // Password change state
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [passwordSuccess, setPasswordSuccess] = useState(false);
  const [passwordError, setPasswordError] = useState('');

  // Active Sessions state
  const [sessions, setSessions] = useState([
    {
      id: 'sess-1',
      device: 'iPhone 15 Pro (This Device)',
      location: 'London, UK · IP 82.165.4.12',
      active: true,
      icon: Smartphone,
      lastActive: 'Active now',
    },
    {
      id: 'sess-2',
      device: 'MacBook Pro 16” (Chrome)',
      location: 'London, UK · IP 82.165.4.12',
      active: false,
      lastActive: '3 hours ago',
      icon: Laptop,
    },
  ]);

  // Security audit log items
  const [auditLogs] = useState([
    {
      id: 'log-1',
      event: 'Successful session sign-in',
      device: 'iPhone 15 Pro',
      time: 'Today at 09:14 AM',
      status: 'success',
    },
    {
      id: 'log-2',
      event: 'Biometric Face ID authentication verified',
      device: 'iPhone 15 Pro',
      time: 'Today at 08:30 AM',
      status: 'success',
    },
    {
      id: 'log-3',
      event: '2FA authentication challenge approved',
      device: 'MacBook Pro 16”',
      time: 'Yesterday at 04:12 PM',
      status: 'success',
    },
  ]);

  const [loggedOutSuccess, setLoggedOutSuccess] = useState(false);
  const [cacheClearedSuccess, setCacheClearedSuccess] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [syncSavedMessage, setSyncSavedMessage] = useState(false);

  useEffect(() => {
    localStorage.setItem('desing_ai_privacy_settings_v4', JSON.stringify(settings));
  }, [settings]);

  if (!isOpen) return null;

  const updateSetting = <K extends keyof PrivacySettings>(key: K, value: PrivacySettings[K]) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
    setSyncSavedMessage(true);
    setTimeout(() => setSyncSavedMessage(false), 2000);
  };

  // Password strength calculation
  const getPasswordStrength = (pwd: string) => {
    if (!pwd) return { score: 0, label: 'None', color: 'bg-slate-700' };
    let score = 0;
    if (pwd.length >= 8) score++;
    if (pwd.length >= 12) score++;
    if (/[A-Z]/.test(pwd)) score++;
    if (/[0-9]/.test(pwd)) score++;
    if (/[^A-Za-z0-9]/.test(pwd)) score++;

    if (score <= 2) return { score, label: 'Weak', color: 'bg-rose-500' };
    if (score <= 4) return { score, label: 'Medium', color: 'bg-amber-500' };
    return { score, label: 'Strong', color: 'bg-emerald-500' };
  };

  const strength = getPasswordStrength(newPassword);

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError('');
    if (newPassword.length < 8) {
      setPasswordError('New password must be at least 8 characters long.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordError('New passwords do not match. Please verify.');
      return;
    }

    setPasswordSuccess(true);
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setTimeout(() => setPasswordSuccess(false), 3500);
  };

  const handleLogoutOtherSessions = () => {
    setSessions((prev) => prev.filter((s) => s.active));
    setLoggedOutSuccess(true);
    setTimeout(() => setLoggedOutSuccess(false), 3000);
  };

  const handleClearCache = () => {
    setCacheClearedSuccess(true);
    setTimeout(() => setCacheClearedSuccess(false), 2500);
  };

  const handleExportData = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      const dataPayload = {
        application: 'Desing AI Interior & Architecture Studio',
        account: 'Omar Shooter',
        handle: '@omarshooter',
        exportTimestamp: new Date().toISOString(),
        totalProjects: projectsCount,
        totalFavorites: favoritesCount,
        privacySettings: settings,
        auditTrail: auditLogs,
      };

      const blob = new Blob([JSON.stringify(dataPayload, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `desing-ai-privacy-export-${new Date().toISOString().split('T')[0]}.json`;
      a.click();
      URL.revokeObjectURL(url);
    }, 1200);
  };

  const handleConfirmAccountDelete = () => {
    if (onClearAllData) {
      onClearAllData();
    } else {
      localStorage.clear();
      window.location.reload();
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl max-h-[92vh] overflow-y-auto no-scrollbar rounded-3xl bg-[#08122c] border border-blue-500/30 p-5 sm:p-6 shadow-2xl text-white flex flex-col">
        {/* Top Header */}
        <div className="flex items-center justify-between pb-3.5 border-b border-white/10 sticky top-0 bg-[#08122c]/95 backdrop-blur-md z-20">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-[#38bdf8]">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-white tracking-tight">Privacy & Security</h3>
                {syncSavedMessage && (
                  <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20 animate-in fade-in">
                    Saved
                  </span>
                )}
              </div>
              <p className="text-[11px] text-slate-400">Manage account protection, AI data isolation, and privacy rights</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Security Status Card */}
        <div className="mt-4 p-3.5 rounded-2xl bg-gradient-to-r from-[#091f54] via-[#122b78] to-[#251f68] border border-blue-400/25 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-emerald-300 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-white block">Account Security Status: High</span>
                <span className="px-2 py-0.2 rounded-full text-[9px] font-extrabold bg-emerald-500 text-slate-900">
                  SECURE
                </span>
              </div>
              <p className="text-[10px] text-slate-200 mt-0.5 leading-relaxed">
                256-Bit TLS · Biometrics Enabled · Model Training Isolation Active
              </p>
            </div>
          </div>
        </div>

        {/* Tabs Switcher */}
        <div className="flex gap-1.5 p-1 bg-black/40 rounded-xl border border-white/10 mt-4">
          <button
            onClick={() => setActiveTab('security')}
            className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              activeTab === 'security'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Lock className="w-3.5 h-3.5" />
            <span>Authentication</span>
          </button>
          <button
            onClick={() => setActiveTab('privacy')}
            className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              activeTab === 'privacy'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>AI Data & Privacy</span>
          </button>
          <button
            onClick={() => setActiveTab('data')}
            className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              activeTab === 'data'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <HardDrive className="w-3.5 h-3.5" />
            <span>Data Rights & Cache</span>
          </button>
        </div>

        {/* TAB 1: AUTHENTICATION & ACCESS */}
        {activeTab === 'security' && (
          <div className="mt-4 flex flex-col gap-4 animate-in fade-in duration-200">
            {/* 2FA & Biometrics Toggles */}
            <div className="p-4 rounded-2xl bg-[#060d21] border border-blue-500/20 flex flex-col gap-3">
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wide flex items-center gap-1.5">
                <KeyRound className="w-3.5 h-3.5 text-sky-400" />
                <span>Multi-Factor Authentication & Biometrics</span>
              </h4>

              {/* 2FA Toggle */}
              <div className="flex items-center justify-between py-2 border-b border-white/5">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-500/15 flex items-center justify-center text-[#38bdf8]">
                    <Lock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-white block">Two-Factor Authentication (2FA)</span>
                    <span className="text-[10px] text-slate-400">
                      Require security code via Google Authenticator or SMS on new device logins
                    </span>
                  </div>
                </div>

                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.twoFactorEnabled}
                    onChange={(e) => updateSetting('twoFactorEnabled', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-10 h-5 bg-slate-800 peer-focus:outline-hidden rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600" />
                </label>
              </div>

              {/* 2FA Method Selector if enabled */}
              {settings.twoFactorEnabled && (
                <div className="flex gap-2 pl-11 pb-2 border-b border-white/5">
                  <button
                    type="button"
                    onClick={() => updateSetting('twoFactorMethod', 'authenticator')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-all ${
                      settings.twoFactorMethod === 'authenticator'
                        ? 'bg-blue-600/30 text-sky-300 border border-blue-400/30'
                        : 'bg-white/5 text-slate-400'
                    }`}
                  >
                    Authenticator App (TOTP)
                  </button>
                  <button
                    type="button"
                    onClick={() => updateSetting('twoFactorMethod', 'sms')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-all ${
                      settings.twoFactorMethod === 'sms'
                        ? 'bg-blue-600/30 text-sky-300 border border-blue-400/30'
                        : 'bg-white/5 text-slate-400'
                    }`}
                  >
                    SMS Verification (+44 •••••••42)
                  </button>
                </div>
              )}

              {/* Biometrics Toggle */}
              <div className="flex items-center justify-between py-2 border-b border-white/5">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-purple-500/15 flex items-center justify-center text-purple-400">
                    <Fingerprint className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-white block">Biometric Login (Face ID / Fingerprint)</span>
                    <span className="text-[10px] text-slate-400">
                      Use Apple Face ID or Touch ID for instant studio unlock
                    </span>
                  </div>
                </div>

                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.biometricEnabled}
                    onChange={(e) => updateSetting('biometricEnabled', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-10 h-5 bg-slate-800 peer-focus:outline-hidden rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600" />
                </label>
              </div>

              {/* Auto-Lock Inactivity Timer */}
              <div className="flex items-center justify-between py-2">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-sky-500/15 flex items-center justify-center text-sky-400">
                    <Timer className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-white block">Session Auto-Lock Duration</span>
                    <span className="text-[10px] text-slate-400">
                      Lock app automatically when backgrounded or inactive
                    </span>
                  </div>
                </div>

                <select
                  value={settings.autoLockDuration}
                  onChange={(e) => updateSetting('autoLockDuration', e.target.value as any)}
                  className="px-2.5 py-1.5 rounded-xl bg-[#09142f] border border-white/10 text-xs text-white focus:outline-hidden focus:border-blue-400 cursor-pointer"
                >
                  <option value="immediate">Immediately</option>
                  <option value="5m">5 Minutes</option>
                  <option value="15m">15 Minutes</option>
                  <option value="1h">1 Hour</option>
                  <option value="never">Never</option>
                </select>
              </div>
            </div>

            {/* Change Password Form */}
            <form onSubmit={handlePasswordSubmit} className="p-4 rounded-2xl bg-[#060d21] border border-blue-500/20">
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wide mb-3 flex items-center gap-2">
                <Lock className="w-3.5 h-3.5 text-sky-400" />
                <span>Change Account Password</span>
              </h4>

              {passwordSuccess && (
                <div className="mb-3 p-2.5 rounded-xl bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs flex items-center gap-2">
                  <Check className="w-4 h-4" />
                  <span>Password updated successfully! Next login requires new credentials.</span>
                </div>
              )}

              {passwordError && (
                <div className="mb-3 p-2.5 rounded-xl bg-rose-500/20 border border-rose-400/30 text-rose-300 text-xs flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4" />
                  <span>{passwordError}</span>
                </div>
              )}

              <div className="flex flex-col gap-2.5 text-xs">
                <div>
                  <label className="block text-[10px] text-slate-400 uppercase font-bold mb-1">
                    Current Password
                  </label>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full px-3 py-2 rounded-xl bg-[#09142f] border border-white/10 text-white placeholder-slate-500 focus:outline-hidden focus:border-blue-400"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <div>
                    <label className="block text-[10px] text-slate-400 uppercase font-bold mb-1">
                      New Password
                    </label>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Min 8 characters"
                      className="w-full px-3 py-2 rounded-xl bg-[#09142f] border border-white/10 text-white placeholder-slate-500 focus:outline-hidden focus:border-blue-400"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] text-slate-400 uppercase font-bold mb-1">
                      Confirm New Password
                    </label>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Repeat new password"
                      className="w-full px-3 py-2 rounded-xl bg-[#09142f] border border-white/10 text-white placeholder-slate-500 focus:outline-hidden focus:border-blue-400"
                    />
                  </div>
                </div>

                {/* Password strength meter */}
                {newPassword && (
                  <div className="flex items-center gap-2 pt-1">
                    <span className="text-[10px] text-slate-400 font-semibold">Strength:</span>
                    <div className="flex-1 h-1.5 bg-slate-800 rounded-full overflow-hidden flex">
                      <div
                        className={`h-full ${strength.color}`}
                        style={{ width: `${(strength.score / 5) * 100}%` }}
                      />
                    </div>
                    <span className="text-[10px] font-bold text-slate-300">{strength.label}</span>
                  </div>
                )}

                <div className="flex items-center justify-between pt-1">
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-[11px] text-slate-400 hover:text-white flex items-center gap-1 cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    <span>{showPassword ? 'Hide characters' : 'Show characters'}</span>
                  </button>

                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md transition-colors cursor-pointer"
                  >
                    Update Password
                  </button>
                </div>
              </div>
            </form>

            {/* Active Sessions */}
            <div className="p-4 rounded-2xl bg-[#060d21] border border-blue-500/20">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wide flex items-center gap-1.5">
                  <Laptop className="w-3.5 h-3.5 text-sky-400" />
                  <span>Active Authorized Devices ({sessions.length})</span>
                </h4>

                {sessions.length > 1 && (
                  <button
                    type="button"
                    onClick={handleLogoutOtherSessions}
                    className="text-[11px] font-semibold text-rose-400 hover:text-rose-300 flex items-center gap-1 cursor-pointer"
                  >
                    <LogOut className="w-3 h-3" />
                    <span>Log out other devices</span>
                  </button>
                )}
              </div>

              {loggedOutSuccess && (
                <div className="mb-2.5 p-2 rounded-lg bg-emerald-500/20 text-emerald-300 text-[11px] flex items-center gap-1.5">
                  <Check className="w-3 h-3" />
                  <span>All other sessions have been safely terminated.</span>
                </div>
              )}

              <div className="flex flex-col gap-2">
                {sessions.map((sess) => {
                  const Icon = sess.icon;
                  return (
                    <div
                      key={sess.id}
                      className="p-2.5 rounded-xl bg-white/5 flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-slate-300">
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <span className="text-xs font-bold text-white block">{sess.device}</span>
                          <span className="text-[10px] text-slate-400">{sess.location}</span>
                        </div>
                      </div>

                      <div className="text-right">
                        {sess.active ? (
                          <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20 flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                            <span>Current</span>
                          </span>
                        ) : (
                          <span className="text-[10px] text-slate-400">{sess.lastActive}</span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Login & Security Audit Trail */}
            <div className="p-4 rounded-2xl bg-[#060d21] border border-blue-500/20">
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wide mb-2.5 flex items-center gap-1.5">
                <History className="w-3.5 h-3.5 text-sky-400" />
                <span>Security Activity Log</span>
              </h4>
              <div className="flex flex-col gap-1.5 text-xs">
                {auditLogs.map((log) => (
                  <div key={log.id} className="p-2 rounded-xl bg-white/5 flex items-center justify-between text-[11px]">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span className="text-slate-200">{log.event}</span>
                    </div>
                    <span className="text-[10px] text-slate-400">{log.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: AI DATA & PRIVACY RIGHTS */}
        {activeTab === 'privacy' && (
          <div className="mt-4 flex flex-col gap-4 animate-in fade-in duration-200">
            {/* AI Model Training Protection */}
            <div className="p-4 rounded-2xl bg-[#060d21] border border-blue-500/20 flex flex-col gap-3">
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wide">
                AI Model & Spatial Privacy Safeguards
              </h4>

              {/* Opt-out of model training */}
              <div className="flex items-start justify-between py-2 border-b border-white/5 gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-white">Private Model Isolation</span>
                    <span className="px-1.5 py-0.2 rounded-md bg-blue-600/30 text-sky-300 text-[9px] font-bold border border-blue-400/30">
                      ENABLED
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-300 mt-0.5 leading-relaxed">
                    Prevent your uploaded room photography, CAD floor plans, and custom interior prompts from being fed into general AI diffusion training datasets.
                  </p>
                </div>

                <label className="relative inline-flex items-center cursor-pointer shrink-0 mt-1">
                  <input
                    type="checkbox"
                    checked={settings.optOutAiTraining}
                    onChange={(e) => updateSetting('optOutAiTraining', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-10 h-5 bg-slate-800 peer-focus:outline-hidden rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600" />
                </label>
              </div>

              {/* EXIF Metadata Stripping */}
              <div className="flex items-start justify-between py-2 border-b border-white/5 gap-3">
                <div>
                  <span className="text-xs font-bold text-white block">Strip EXIF GPS & Device Metadata</span>
                  <p className="text-[11px] text-slate-300 mt-0.5 leading-relaxed">
                    Automatically scrubs location GPS coordinates, camera serial numbers, and home addresses before photos touch cloud processors.
                  </p>
                </div>

                <label className="relative inline-flex items-center cursor-pointer shrink-0 mt-1">
                  <input
                    type="checkbox"
                    checked={settings.stripExifData}
                    onChange={(e) => updateSetting('stripExifData', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-10 h-5 bg-slate-800 peer-focus:outline-hidden rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600" />
                </label>
              </div>

              {/* Watermark setting */}
              <div className="flex items-start justify-between py-2 gap-3">
                <div>
                  <span className="text-xs font-bold text-white block">Cryptographic Provenance Watermark (C2PA)</span>
                  <p className="text-[11px] text-slate-300 mt-0.5 leading-relaxed">
                    Embed invisible provenance metadata into exported 4K renders to verify original creator copyright.
                  </p>
                </div>

                <label className="relative inline-flex items-center cursor-pointer shrink-0 mt-1">
                  <input
                    type="checkbox"
                    checked={settings.watermarkDownloads}
                    onChange={(e) => updateSetting('watermarkDownloads', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-10 h-5 bg-slate-800 peer-focus:outline-hidden rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600" />
                </label>
              </div>
            </div>

            {/* Profile Visibility & Public Favorites Showcase */}
            <div className="p-4 rounded-2xl bg-[#060d21] border border-blue-500/20 flex flex-col gap-3">
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wide">
                Community Discoverability & Profile Privacy
              </h4>

              {/* Stealth Mode */}
              <div className="flex items-start justify-between py-2 border-b border-white/5 gap-3">
                <div>
                  <span className="text-xs font-bold text-white block">Profile Stealth Mode</span>
                  <p className="text-[11px] text-slate-300 mt-0.5 leading-relaxed">
                    Hide your profile from public member directories, community search, and designer rankings.
                  </p>
                </div>

                <label className="relative inline-flex items-center cursor-pointer shrink-0 mt-1">
                  <input
                    type="checkbox"
                    checked={settings.profileVisibility === 'private'}
                    onChange={(e) => updateSetting('profileVisibility', e.target.checked ? 'private' : 'public')}
                    className="sr-only peer"
                  />
                  <div className="w-10 h-5 bg-slate-800 peer-focus:outline-hidden rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600" />
                </label>
              </div>

              {/* Public Favorites Showcase */}
              <div className="flex items-start justify-between py-2 border-b border-white/5 gap-3">
                <div>
                  <span className="text-xs font-bold text-white block">Showcase Saved Favorites Publicly</span>
                  <p className="text-[11px] text-slate-300 mt-0.5 leading-relaxed">
                    Allow other community members to view the designs you have favorited on your public profile.
                  </p>
                </div>

                <label className="relative inline-flex items-center cursor-pointer shrink-0 mt-1">
                  <input
                    type="checkbox"
                    checked={settings.showFavoritesPublicly}
                    onChange={(e) => updateSetting('showFavoritesPublicly', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-10 h-5 bg-slate-800 peer-focus:outline-hidden rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600" />
                </label>
              </div>

              {/* Studio Live Activity Broadcast */}
              <div className="flex items-start justify-between py-2 gap-3">
                <div>
                  <span className="text-xs font-bold text-white block">Live Studio Activity Indicator</span>
                  <p className="text-[11px] text-slate-300 mt-0.5 leading-relaxed">
                    Display a subtle green indicator when you are actively generating renders or creating floor plans.
                  </p>
                </div>

                <label className="relative inline-flex items-center cursor-pointer shrink-0 mt-1">
                  <input
                    type="checkbox"
                    checked={settings.activityStatusBroadcast}
                    onChange={(e) => updateSetting('activityStatusBroadcast', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-10 h-5 bg-slate-800 peer-focus:outline-hidden rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600" />
                </label>
              </div>
            </div>

            {/* Prompt Retention Storage Policy */}
            <div className="p-4 rounded-2xl bg-[#060d21] border border-blue-500/20">
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wide mb-2.5">
                AI Prompt History Retention Policy
              </h4>

              <div className="grid grid-cols-3 gap-2 text-xs">
                {[
                  { id: 'ephemeral' as const, label: 'Zero Retention', desc: 'Deleted after render' },
                  { id: '30days' as const, label: '30 Days', desc: 'Auto-prune old prompts' },
                  { id: 'forever' as const, label: 'Permanent', desc: 'Saved indefinitely' },
                ].map((opt) => (
                  <button
                    type="button"
                    key={opt.id}
                    onClick={() => updateSetting('promptRetention', opt.id)}
                    className={`p-2.5 rounded-xl border text-left cursor-pointer transition-all ${
                      settings.promptRetention === opt.id
                        ? 'bg-blue-600/30 border-sky-400 text-white shadow-md'
                        : 'bg-white/5 border-white/5 text-slate-400 hover:text-white'
                    }`}
                  >
                    <span className="font-bold text-xs block">{opt.label}</span>
                    <span className="text-[10px] opacity-80">{opt.desc}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: DATA RIGHTS, STORAGE & CACHE */}
        {activeTab === 'data' && (
          <div className="mt-4 flex flex-col gap-4 animate-in fade-in duration-200">
            {/* Export Personal Data Archive */}
            <div className="p-4 rounded-2xl bg-[#060d21] border border-blue-500/20 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-white block">Download Your Personal Data Archive</span>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Export your saved projects ({projectsCount}), saved favorites ({favoritesCount}), prompt history, and security settings as JSON.
                </p>
              </div>

              <button
                type="button"
                onClick={handleExportData}
                disabled={isExporting}
                className="py-2 px-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:brightness-110 text-white text-xs font-bold flex items-center gap-1.5 shadow-md cursor-pointer shrink-0 ml-3"
              >
                <Download className="w-3.5 h-3.5" />
                <span>{isExporting ? 'Packing JSON...' : 'Export Archive'}</span>
              </button>
            </div>

            {/* Cloud Auto-Backup & Sync Provider */}
            <div className="p-4 rounded-2xl bg-[#060d21] border border-blue-500/20 flex flex-col gap-2.5">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-white block">Cloud Backup & Storage Sync</span>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Automatically backup finished 4K design exports to your preferred cloud drive
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-2 text-xs pt-1">
                {[
                  { id: 'none' as const, label: 'None (Local)' },
                  { id: 'google_drive' as const, label: 'Google Drive' },
                  { id: 'icloud' as const, label: 'Apple iCloud' },
                  { id: 'dropbox' as const, label: 'Dropbox' },
                ].map((prov) => (
                  <button
                    key={prov.id}
                    type="button"
                    onClick={() => updateSetting('cloudBackupProvider', prov.id)}
                    className={`p-2 rounded-xl border text-center transition-all cursor-pointer ${
                      settings.cloudBackupProvider === prov.id
                        ? 'bg-blue-600/30 border-sky-400 text-sky-200 font-bold'
                        : 'bg-white/5 border-white/5 text-slate-400 hover:text-white'
                    }`}
                  >
                    <span className="text-[11px] block truncate">{prov.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Clear Local Cache */}
            <div className="p-4 rounded-2xl bg-[#060d21] border border-blue-500/20 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-white block">Clear Local Render & Mesh Cache</span>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Frees up device memory by flushing cached temporary 4K textures and floor plan canvas buffers.
                </p>
              </div>

              <button
                type="button"
                onClick={handleClearCache}
                className="py-2 px-3.5 rounded-xl bg-white/10 hover:bg-white/15 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shrink-0 ml-3"
              >
                {cacheClearedSuccess ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Cache Cleared!</span>
                  </>
                ) : (
                  <>
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Clear Cache</span>
                  </>
                )}
              </button>
            </div>

            {/* Telemetry Toggle */}
            <div className="p-4 rounded-2xl bg-[#060d21] border border-blue-500/20 flex items-start justify-between gap-3">
              <div>
                <span className="text-xs font-bold text-white block">Anonymous Diagnostic & Crash Telemetry</span>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Send anonymous performance crash reports to help improve AI generation speeds.
                </p>
              </div>

              <label className="relative inline-flex items-center cursor-pointer shrink-0 mt-1">
                <input
                  type="checkbox"
                  checked={settings.crashTelemetryEnabled}
                  onChange={(e) => updateSetting('crashTelemetryEnabled', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-10 h-5 bg-slate-800 peer-focus:outline-hidden rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600" />
              </label>
            </div>

            {/* Danger Zone: Permanently Delete Account */}
            <div className="p-4 rounded-2xl bg-rose-950/20 border border-rose-500/25">
              <h4 className="text-xs font-bold text-rose-400 uppercase tracking-wide mb-1 flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4" />
                <span>Danger Zone</span>
              </h4>
              <p className="text-[11px] text-slate-300 mb-3">
                Permanently delete your account, wipe all personal profile data, all saved projects ({projectsCount}), and all saved favorites ({favoritesCount}).
              </p>

              {showDeleteConfirm ? (
                <div className="p-3.5 rounded-xl bg-rose-950/60 border border-rose-500/40 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <span className="text-xs font-semibold text-rose-200">
                    Are you sure? All {projectsCount} projects and {favoritesCount} favorites will be completely erased.
                  </span>
                  <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
                    <button
                      type="button"
                      onClick={() => setShowDeleteConfirm(false)}
                      className="px-2.5 py-1.5 rounded-lg bg-white/10 text-xs text-white hover:bg-white/15 cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={handleConfirmAccountDelete}
                      className="px-3.5 py-1.5 rounded-lg bg-rose-600 text-xs font-bold text-white hover:bg-rose-500 cursor-pointer shadow-md"
                    >
                      Confirm Delete Account
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setShowDeleteConfirm(true)}
                  className="py-2 px-3.5 rounded-xl bg-rose-600/20 hover:bg-rose-600/30 text-rose-300 border border-rose-500/30 text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Permanently Delete Account</span>
                </button>
              )}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="mt-5 pt-3.5 border-t border-white/10 flex items-center justify-between">
          <span className="text-[11px] text-slate-400">
            Privacy controls automatically sync locally
          </span>

          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:brightness-110 text-white text-xs font-bold shadow-md cursor-pointer transition-all"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
