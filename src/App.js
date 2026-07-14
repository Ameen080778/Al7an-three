/* eslint-disable */
import React, { useState, useEffect, useRef , useMemo } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Users, ClipboardList, FileText, BarChart3, Plus, Edit2, Trash2, Search, Download, Menu, X, Lock, Unlock, CheckSquare, Key, Copy, Check, LogOut, QrCode, Camera, XCircle, Sun, Moon, Settings, BookOpen, Video, Music, Image, FileImage, ChevronDown, ChevronUp, ExternalLink, Eye, Save, Trash } from 'lucide-react';
import { QRCodeCanvas } from 'qrcode.react';
import * as XLSX from 'xlsx';
import { Html5Qrcode } from 'html5-qrcode';
import toast, { Toaster } from 'react-hot-toast';

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_KEY
);

/* ═══════════════════════════════════════════════
   GLOBAL STYLES — supports [data-theme="light"]
═══════════════════════════════════════════════ */
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;600;700;900&family=Tajawal:wght@300;400;500;700;900&display=swap');

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    /* ══ DARK MODE (default) ══ */
    :root, [data-theme="dark"] {
      --bg:         #080810;
      --bg-card:    rgba(255,255,255,0.035);
      --bg-card2:   rgba(255,255,255,0.06);
      --gold:       #f5c842;
      --gold-d:     #e8a800;
      --gold-glow:  rgba(245,200,66,0.18);
      --violet:     #8b5cf6;
      --violet2:    #6d28d9;
      --teal:       #2dd4bf;
      --rose:       #f43f5e;
      --green:      #10b981;
      --border:     rgba(255,255,255,0.07);
      --border-g:   rgba(245,200,66,0.25);
      --text:       #f0f0f0;
      --text-sec:   rgba(240,240,240,0.65);
      --muted:      rgba(240,240,240,0.45);
      --sidebar-bg: rgba(8,8,16,0.96);
      --topbar-bg:  rgba(8,8,16,0.95);
      --modal-bg:   #0e0e1c;
      --inp-bg:     rgba(255,255,255,0.05);
      --tbl-head:   rgba(245,200,66,0.06);
      --tbl-row:    rgba(255,255,255,0.04);
      --tbl-hover:  rgba(255,255,255,0.035);
      --bnav-bg:    rgba(6,6,14,0.96);
      --bnav-border:rgba(245,200,66,0.18);
      --shadow-card:0 4px 24px rgba(0,0,0,0.4);
      --toggle-bg:  rgba(255,255,255,0.06);
    }

    /* ══ LIGHT MODE — Facebook-style blue-gray ══ */
    [data-theme="light"] {
      --bg:         #e9eef6;
      --bg-card:    rgba(255,255,255,0.88);
      --bg-card2:   #ffffff;
      --gold:       #1877f2;
      --gold-d:     #0d6efd;
      --gold-glow:  rgba(24,119,242,0.10);
      --violet:     #1877f2;
      --violet2:    #0d6efd;
      --teal:       #0d9488;
      --rose:       #e11d48;
      --green:      #059669;
      --border:     rgba(24,119,242,0.14);
      --border-g:   rgba(24,119,242,0.28);
      --text:       #1c2b4a;
      --text-sec:   rgba(28,43,74,0.72);
      --muted:      rgba(28,43,74,0.45);
      --sidebar-bg: #ffffff;
      --topbar-bg:  rgba(255,255,255,0.97);
      --modal-bg:   #ffffff;
      --inp-bg:     rgba(24,119,242,0.05);
      --tbl-head:   rgba(24,119,242,0.05);
      --tbl-row:    rgba(0,0,0,0.018);
      --tbl-hover:  rgba(24,119,242,0.05);
      --bnav-bg:    #ffffff;
      --bnav-border:rgba(24,119,242,0.15);
      --shadow-card:0 2px 12px rgba(0,0,0,0.10);
      --toggle-bg:  rgba(24,119,242,0.07);
    }

    html { font-size: 15px; }
    body {
      font-family: 'Cairo', 'Tajawal', sans-serif;
      background: var(--bg);
      color: var(--text);
      overflow-x: hidden;
      -webkit-tap-highlight-color: transparent;
      transition: background 0.35s ease, color 0.35s ease;
    }

    ::-webkit-scrollbar { width: 4px; height: 4px; }
    ::-webkit-scrollbar-track { background: transparent; }
    ::-webkit-scrollbar-thumb { background: rgba(184,134,11,0.25); border-radius: 99px; }

    /* ── Animations ── */
    @keyframes fadeUp   { from { opacity:0; transform:translateY(18px); } to { opacity:1; transform:none; } }
    @keyframes fadeIn   { from { opacity:0; } to { opacity:1; } }
    @keyframes glow2    { 0%,100%{ box-shadow:0 0 14px rgba(245,200,66,.15);} 50%{ box-shadow:0 0 32px rgba(245,200,66,.4);} }
    @keyframes shimmer  { 0%{ background-position:-200% center;} 100%{ background-position:200% center;} }
    @keyframes pulse2   { 0%,100%{ transform:scale(1);} 50%{ transform:scale(1.04);} }
    @keyframes pulse    { 0%,100%{ opacity:.4; } 50%{ opacity:1; } }
    @keyframes spin     { to { transform:rotate(360deg); } }
    @keyframes dotPulse { 0%,80%,100%{ transform:scale(0); opacity:.5; } 40%{ transform:scale(1); opacity:1; } }
    @keyframes themeSwitch { 0%{ opacity:0; transform:scale(0.9) rotate(-10deg); } 100%{ opacity:1; transform:scale(1) rotate(0deg); } }

    .anim-up    { animation: fadeUp  .5s cubic-bezier(.16,1,.3,1) both; }
    .anim-in    { animation: fadeIn  .4s ease both; }
    .anim-glow  { animation: glow2   2.5s ease-in-out infinite; }
    .anim-pulse { animation: pulse2  2s ease-in-out infinite; }
    .anim-spin  { animation: spin    .85s linear infinite; }
    .anim-theme { animation: themeSwitch .3s cubic-bezier(.34,1.56,.64,1) both; }

    /* ── Glass ── */
    .glass {
      background: var(--bg-card);
      backdrop-filter: blur(16px) saturate(150%);
      border: 1px solid var(--border);
      border-radius: var(--r);
      box-shadow: var(--shadow-card);
      transition: background 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
    }
    .glass2 {
      background: var(--bg-card2);
      backdrop-filter: blur(12px);
      border: 1px solid var(--border-g);
      border-radius: var(--r);
      box-shadow: var(--shadow-card);
      transition: background 0.3s ease, border-color 0.3s ease;
    }

    /* ── Shimmer text ── */
    .shimmer {
      background: linear-gradient(90deg, var(--gold) 0%, #c9970a 45%, var(--gold) 85%);
      background-size: 200% auto;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      animation: shimmer 3s linear infinite;
    }
    [data-theme="light"] .shimmer {
      background: linear-gradient(90deg, #7c3aed 0%, #a855f7 45%, #7c3aed 85%);
      background-size: 200% auto;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      animation: shimmer 3s linear infinite;
    }

    /* ── CSS Variables ── */
    :root { --r: 16px; --r-sm: 10px; --sidebar-w: 256px; --nav-h: 60px; }

    /* ── Buttons ── */
    .btn {
      display: inline-flex; align-items: center; justify-content: center; gap: 7px;
      padding: 9px 20px; border-radius: var(--r-sm);
      font-family: 'Cairo', sans-serif; font-weight: 700; font-size: 13px;
      border: none; cursor: pointer; position: relative; overflow: hidden;
      transition: all .2s cubic-bezier(.16,1,.3,1);
      -webkit-tap-highlight-color: transparent;
      touch-action: manipulation;
    }
    .btn:active { transform: scale(.94); }
    .btn-gold  { background: linear-gradient(135deg, #f5c842 0%, #e8a800 100%); color: #0a0a14; box-shadow: 0 3px 18px rgba(245,200,66,.3); }
    .btn-gold:hover { box-shadow: 0 5px 26px rgba(245,200,66,.5); }
    [data-theme="light"] .btn-gold { background: linear-gradient(135deg, #7c3aed 0%, #5b21b6 100%); color: #fff; box-shadow: 0 3px 14px rgba(124,58,237,.3); }
    .btn-violet{ background: linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%); color: #fff; box-shadow: 0 3px 14px rgba(139,92,246,.3); }
    .btn-teal  { background: linear-gradient(135deg, #2dd4bf 0%, #0d9488 100%); color: #0a0a14; box-shadow: 0 3px 14px rgba(45,212,191,.3); }
    [data-theme="light"] .btn-teal { color: #fff; }
    .btn-rose  { background: linear-gradient(135deg, #f43f5e 0%, #be123c 100%); color: #fff; box-shadow: 0 3px 14px rgba(244,63,94,.3); }
    .btn-green { background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: #fff; box-shadow: 0 3px 14px rgba(16,185,129,.3); }
    .btn-ghost {
      background: var(--toggle-bg); color: var(--text);
      border: 1px solid var(--border);
      transition: all 0.2s;
    }
    .btn-ghost:hover { border-color: var(--gold); color: var(--gold); }
    .btn-sm  { padding: 6px 13px; font-size: 12px; border-radius: 8px; }
    .btn-lg  { padding: 12px 28px; font-size: 15px; border-radius: 13px; }
    .btn-xl  { padding: 15px 36px; font-size: 17px; border-radius: 15px; }
    .btn-icon{ padding: 8px; border-radius: 9px; }

    /* ── Inputs ── */
    .inp {
      width: 100%; padding: 10px 14px;
      font-family: 'Cairo', sans-serif; font-size: 14px;
      background: var(--inp-bg); border: 1.5px solid var(--border);
      border-radius: var(--r-sm); color: var(--text); outline: none;
      transition: border .18s, box-shadow .18s, background 0.3s, color 0.3s;
      -webkit-appearance: none;
    }
    .inp:focus { border-color: var(--gold); box-shadow: 0 0 0 3px rgba(184,134,11,.12); }
    .inp::placeholder { color: var(--muted); }

    /* ── Table ── */
    .tbl { width: 100%; border-collapse: collapse; font-size: 12.5px; }
    .tbl thead th {
      padding: 10px 12px; text-align: right; font-weight: 700;
      background: var(--tbl-head); color: var(--gold);
      border-bottom: 1.5px solid var(--border-g);
      white-space: nowrap; font-size: 12px;
    }
    .tbl tbody tr { border-bottom: 1px solid var(--border); transition: background .15s; }
    .tbl tbody tr:hover { background: var(--tbl-hover); }
    .tbl td { padding: 9px 12px; vertical-align: middle; color: var(--text); }

    /* ── Sidebar desktop ── */
    .sidebar {
      width: var(--sidebar-w);
      background: var(--sidebar-bg);
      backdrop-filter: blur(28px);
      border-left: 1px solid var(--border-g);
      height: 100vh; position: fixed; top: 0; right: 0;
      display: flex; flex-direction: column; z-index: 40;
      transition: transform .3s cubic-bezier(.16,1,.3,1), background 0.35s ease;
    }
    @media (min-width: 769px) { .sidebar { transform: translateX(0) !important; } }
    @media (max-width: 768px) {
      .sidebar { transform: translateX(100%); width: 80vw; max-width: 300px; }
      .sidebar.open { transform: translateX(0); }
      /* رفع منطقة الخروج عشان تبان فوق الـ bottom nav */
      .sidebar-logout {
        padding-bottom: calc(10px + max(16px, env(safe-area-inset-bottom)) + 62px) !important;
      }
    }

    /* ── Bottom nav (mobile) ── */
    .bottom-nav {
      display: none;
      position: fixed; bottom: 0; left: 0; right: 0;
      background: var(--bnav-bg);
      backdrop-filter: blur(24px) saturate(180%);
      border-top: 1px solid var(--bnav-border);
      z-index: 45;
      padding: 4px 4px max(8px, env(safe-area-inset-bottom));
      box-shadow: 0 -4px 20px rgba(0,0,0,.12);
      transition: background 0.35s ease;
    }
    @media (max-width: 768px) { .bottom-nav { display: flex; } }

    .bnav-item {
      flex: 1; display: flex; flex-direction: column; align-items: center;
      gap: 2px; padding: 6px 2px; cursor: pointer;
      color: var(--muted); border: none; background: none;
      font-family: 'Cairo', sans-serif; font-size: 9px; font-weight: 700;
      -webkit-tap-highlight-color: transparent; position: relative;
      transition: color .2s cubic-bezier(.16,1,.3,1);
    }
    .bnav-item svg { width: 20px; height: 20px; transition: transform .25s cubic-bezier(.34,1.56,.64,1); }
    .bnav-item:active svg { transform: scale(.82); }
    .bnav-item.active { color: var(--gold); }
    .bnav-item.active svg { transform: scale(1.1) translateY(-1px); filter: drop-shadow(0 0 5px rgba(184,134,11,.6)); }
    .bnav-item.active::after {
      content: ''; position: absolute; bottom: 1px; left: 50%; transform: translateX(-50%);
      width: 4px; height: 4px; border-radius: 50%; background: var(--gold);
      box-shadow: 0 0 6px var(--gold);
    }
    .bnav-item.active::before {
      content: ''; position: absolute; inset: 2px 4px; border-radius: 10px;
      background: var(--gold-glow); z-index: -1;
    }

    /* ── Nav item (sidebar) ── */
    .nav-item {
      display: flex; align-items: center; gap: 10px; padding: 10px 15px;
      border-radius: var(--r-sm); cursor: pointer; font-weight: 600; font-size: 13px;
      transition: all .18s; color: var(--muted); border: 1px solid transparent; margin: 2px 0;
      background: none; width: 100%; text-align: right;
    }
    .nav-item:hover { color: var(--text); background: var(--bg-card2); }
    .nav-item.active {
      background: linear-gradient(135deg, var(--gold-glow), rgba(139,92,246,.1));
      color: var(--gold); border-color: var(--border-g);
    }

    /* ── Badges ── */
    .badge {
      display: inline-block; padding: 2px 9px; border-radius: 99px;
      font-size: 10.5px; font-weight: 700; letter-spacing: .4px;
    }
    .badge-gold   { background: var(--gold-glow); color: var(--gold); border: 1px solid var(--border-g); }
    .badge-violet { background: rgba(139,92,246,.12); color: var(--violet); border: 1px solid rgba(139,92,246,.25); }
    .badge-green  { background: rgba(16,185,129,.12); color: var(--green); border: 1px solid rgba(16,185,129,.25); }
    .badge-rose   { background: rgba(244,63,94,.12);  color: var(--rose);  border: 1px solid rgba(244,63,94,.25); }
    .badge-teal   { background: rgba(45,212,191,.12); color: var(--teal);  border: 1px solid rgba(45,212,191,.25); }

    /* ── Modal ── */
    .modal-overlay {
      position: fixed; inset: 0; background: rgba(0,0,0,.55);
      backdrop-filter: blur(8px); z-index: 60;
      display: flex; align-items: flex-end; justify-content: center;
      padding: 0;
    }
    @media (min-width: 600px) { .modal-overlay { align-items: center; padding: 16px; } }
    .modal {
      background: var(--modal-bg); border: 1px solid var(--border-g);
      border-radius: 24px 24px 0 0; padding: 24px 20px;
      width: 100%; max-width: 520px;
      max-height: 92vh; overflow-y: auto;
      animation: fadeUp .3s cubic-bezier(.16,1,.3,1) both;
      transition: background 0.35s ease;
    }
    @media (min-width: 600px) { .modal { border-radius: 22px; padding: 28px; } }

    /* ── Progress ── */
    .prog-track { height: 5px; background: var(--border); border-radius: 99px; overflow: hidden; }
    .prog-fill  { height: 100%; border-radius: 99px; transition: width .5s cubic-bezier(.16,1,.3,1); }

    /* ── Checkbox ── */
    .chk { width: 16px; height: 16px; cursor: pointer; accent-color: var(--gold); }
    .chk:disabled { opacity: .3; cursor: not-allowed; }

    /* ── Score input ── */
    .score-inp {
      width: 64px; padding: 6px 8px; text-align: center; font-weight: 700;
      background: var(--inp-bg); border: 1.5px solid var(--border);
      border-radius: 8px; color: var(--text); font-family: 'Cairo', sans-serif;
      outline: none; font-size: 13px; transition: border .18s, background 0.3s;
    }
    .score-inp:focus { border-color: var(--gold); }
    input[type=number]::-webkit-inner-spin-button { -webkit-appearance: none; }

    /* ── Scan cards ── */
    .scan-ok  { border: 2px solid var(--green); background: rgba(16,185,129,.08); }
    .scan-warn{ border: 2px solid #f59e0b;      background: rgba(245,158,11,.08); }
    .scan-err { border: 2px solid var(--rose);  background: rgba(244,63,94,.08); }

    /* ── Layout ── */
    .main-layout { display: flex; min-height: 100vh; }
    .page-content {
      flex: 1;
      margin-right: var(--sidebar-w);
      padding: 28px 24px;
      overflow-x: hidden;
    }
    @media (max-width: 768px) {
      .page-content { margin-right: 0 !important; padding: 16px 14px 80px !important; }
    }

    /* ── Responsive helpers ── */
    .hide-mobile  { display: table-cell; }
    @media (max-width: 640px) { .hide-mobile { display: none !important; } }

    /* ── Card grid ── */
    .grid-stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; margin-bottom: 22px; }
    @media (max-width: 520px) { .grid-stats { grid-template-columns: 1fr 1fr; } }
    .grid-2col { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
    @media (max-width: 480px) { .grid-2col { grid-template-columns: 1fr; } }

    /* ── Page header ── */
    .page-header {
      display: flex; align-items: center; justify-content: space-between;
      flex-wrap: wrap; gap: 12px; margin-bottom: 20px;
    }
    .page-title { font-size: 22px; font-weight: 900; color: var(--gold); }
    @media (max-width: 480px) { .page-title { font-size: 18px; } }

    /* ── Mobile top bar ── */
    .topbar {
      display: none; position: fixed; top: 0; left: 0; right: 0; z-index: 35;
      background: var(--topbar-bg); backdrop-filter: blur(20px);
      border-bottom: 1px solid var(--border-g);
      height: 52px; align-items: center; justify-content: space-between;
      padding: 0 14px;
      transition: background 0.35s ease;
    }
    @media (max-width: 768px) {
      .topbar { display: flex; }
      .page-content { padding-top: 66px !important; }
    }

    /* ── Dot loading ── */
    .dot { display:inline-block; width:8px; height:8px; border-radius:50%; margin:0 3px; }
    .dot:nth-child(1){ animation: dotPulse 1.4s .0s infinite; background:var(--violet); }
    .dot:nth-child(2){ animation: dotPulse 1.4s .2s infinite; background:var(--gold); }
    .dot:nth-child(3){ animation: dotPulse 1.4s .4s infinite; background:var(--teal); }

    /* ── Student card (mobile attendance) ── */
    .stu-card {
      background: var(--bg-card2); border: 1px solid var(--border);
      border-radius: 12px; padding: 12px 14px;
      display: flex; align-items: center; justify-content: space-between; gap: 10px;
    }

    /* ── Session pill ── */
    .sess-pill {
      display: flex; flex-direction: column; align-items: center;
      padding: 8px 4px; border-radius: 10px;
      font-size: 11px; font-weight: 700; gap: 4px;
      transition: all .18s; cursor: pointer; border: 1px solid transparent;
      min-width: 36px;
    }
    .sess-pill.selected { background: var(--gold-glow); border-color: var(--border-g); color: var(--gold); }
    .sess-pill:not(.selected) { background: var(--inp-bg); color: var(--muted); }

    /* ── Login card ── */
    .login-card {
      width: 100%; max-width: 420px;
      background: var(--bg-card2);
      border: 1px solid var(--border-g);
      border-radius: 24px; padding: 36px 28px;
      box-shadow: var(--shadow-card);
      transition: background 0.35s ease;
    }
    @media (max-width: 480px) { .login-card { padding: 28px 20px; border-radius: 20px; } }

    /* ── Settings dropdown ── */
    .settings-btn {
      position: relative;
      display: inline-flex; align-items: center; justify-content: center;
      width: 34px; height: 34px; border-radius: 10px; border: none; cursor: pointer;
      background: var(--toggle-bg); border: 1.5px solid var(--border);
      color: var(--muted); transition: all 0.2s cubic-bezier(.16,1,.3,1);
      font-family: 'Cairo', sans-serif;
    }
    .settings-btn:hover, .settings-btn.open {
      border-color: var(--gold);
      color: var(--gold);
      background: var(--gold-glow);
    }
    .settings-btn:active { transform: scale(0.9); }

    @keyframes dropDown { from { opacity:0; transform:translateY(-8px) scale(0.96); } to { opacity:1; transform:none; } }

    .settings-dropdown {
      position: absolute;
      top: calc(100% + 10px);
      left: 50%;
      transform: translateX(-50%);
      min-width: 190px;
      background: var(--modal-bg);
      border: 1.5px solid var(--border-g);
      border-radius: 14px;
      padding: 8px;
      box-shadow: 0 12px 40px rgba(0,0,0,0.22);
      z-index: 200;
      animation: dropDown 0.22s cubic-bezier(.16,1,.3,1) both;
    }
    /* على الموبايل في الـ topbar يكون لليمين */
    .settings-dropdown.from-topbar {
      left: auto;
      right: 0;
      transform: none;
    }
    /* على الديسكتوب في الـ sidebar يكون لليمين كمان */
    .settings-dropdown.from-sidebar {
      left: auto;
      right: 0;
      transform: none;
      top: calc(100% + 8px);
    }

    .settings-item {
      display: flex; align-items: center; gap: 10px;
      width: 100%; padding: 10px 12px; border-radius: 10px;
      border: none; cursor: pointer; background: none;
      font-family: 'Cairo', sans-serif; font-weight: 700; font-size: 13px;
      color: var(--text); text-align: right;
      transition: background 0.15s;
    }
    .settings-item:hover { background: var(--inp-bg); }

    /* ── Overflow table wrapper ── */
    .tbl-wrap { overflow-x: auto; -webkit-overflow-scrolling: touch; }

    /* Light mode BgDeco overlay */
    [data-theme="light"] .bg-deco-dark { display: none; }

    /* ── Light mode specific overrides ── */
    [data-theme="light"] .tbl thead th { color: var(--gold); }
    [data-theme="light"] .page-title { color: var(--gold); }
  `}</style>
);

/* ═══════════════════════════════════════════════
   BACKGROUND DECORATION
═══════════════════════════════════════════════ */
const BgDeco = ({ isDark }) => (
  <div style={{ position:'fixed', inset:0, pointerEvents:'none', zIndex:0, overflow:'hidden' }}>
    {isDark ? (
      <>
        <div style={{ position:'absolute', top:'-15%', right:'-8%', width:'500px', height:'500px', borderRadius:'50%', background:'radial-gradient(circle, rgba(139,92,246,.1) 0%, transparent 70%)', filter:'blur(50px)' }} />
        <div style={{ position:'absolute', bottom:'-8%', left:'-4%', width:'400px', height:'400px', borderRadius:'50%', background:'radial-gradient(circle, rgba(245,200,66,.07) 0%, transparent 70%)', filter:'blur(50px)' }} />
        <svg style={{ position:'absolute', inset:0, width:'100%', height:'100%', opacity:.03 }}>
          <defs>
            <pattern id="g" width="50" height="50" patternUnits="userSpaceOnUse">
              <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#fff" strokeWidth=".5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#g)" />
        </svg>
      </>
    ) : (
      <>
        <div style={{ position:'absolute', top:'-10%', right:'-5%', width:'500px', height:'500px', borderRadius:'50%', background:'radial-gradient(circle, rgba(109,40,217,.06) 0%, transparent 70%)', filter:'blur(60px)' }} />
        <div style={{ position:'absolute', bottom:'-8%', left:'-4%', width:'400px', height:'400px', borderRadius:'50%', background:'radial-gradient(circle, rgba(184,134,11,.08) 0%, transparent 70%)', filter:'blur(60px)' }} />
        <div style={{ position:'absolute', top:'40%', left:'30%', width:'300px', height:'300px', borderRadius:'50%', background:'radial-gradient(circle, rgba(13,148,136,.05) 0%, transparent 70%)', filter:'blur(50px)' }} />
        <svg style={{ position:'absolute', inset:0, width:'100%', height:'100%', opacity:.018 }}>
          <defs>
            <pattern id="gl" width="50" height="50" patternUnits="userSpaceOnUse">
              <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#000" strokeWidth=".5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#gl)" />
        </svg>
      </>
    )}
  </div>
);

/* ═══════════════════════════════════════════════
   SETTINGS MENU — زرار ⚙️ بيفتح dropdown فيه الـ theme toggle
═══════════════════════════════════════════════ */
const SettingsMenu = ({ isDark, onToggle, isOpen, onOpenChange, dropdownClass = '' }) => {
  const ref = React.useRef(null);

  // إغلاق لو ضغط برا
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) onOpenChange(false);
    };
    document.addEventListener('mousedown', handler);
    document.addEventListener('touchstart', handler);
    return () => { document.removeEventListener('mousedown', handler); document.removeEventListener('touchstart', handler); };
  }, [isOpen, onOpenChange]);

  return (
    <div ref={ref} style={{ position: 'relative', display: 'inline-block' }}>
      <button
        className={`settings-btn${isOpen ? ' open' : ''}`}
        onClick={() => onOpenChange(!isOpen)}
        title="الإعدادات ⚙️"
      >
        <Settings size={16} style={{ transition: 'transform 0.4s', transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)' }} />
      </button>

      {isOpen && (
        <div className={`settings-dropdown ${dropdownClass}`}>
          {/* Theme row */}
          <button className="settings-item" onClick={() => { onToggle(); onOpenChange(false); }}>
            <div style={{
              width: 28, height: 28, borderRadius: 9, flexShrink: 0,
              background: isDark
                ? 'linear-gradient(135deg,#f5c842,#e8a800)'
                : 'linear-gradient(135deg,#1877f2,#0d6efd)',
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
              {isDark
                ? <Sun size={14} color="#0a0a14" strokeWidth={2.5} />
                : <Moon size={14} color="#fff" strokeWidth={2.5} />
              }
            </div>
            <div style={{ textAlign: 'right' }}>
              <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', lineHeight: 1.2 }}>
                {isDark ? 'الوضع الفاتح' : 'الوضع الداكن'}
              </p>
              <p style={{ fontSize: 10, color: 'var(--muted)', marginTop: 1 }}>
                {isDark ? 'تحويل للـ Light Mode ☀️' : 'تحويل للـ Dark Mode 🌙'}
              </p>
            </div>
          </button>
        </div>
      )}
    </div>
  );
};

/* ═══════════════════════════════════════════════
   MAIN APP
═══════════════════════════════════════════════ */
const App = () => {
  // ── Theme state ──────────────────────────────
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved ? saved === 'dark' : true; // default dark
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  const toggleTheme = () => setIsDark(prev => !prev);

  // ── App state ─────────────────────────────────
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [showSettingsMenu, setShowSettingsMenu] = useState(false);

  const [currentPage, setCurrentPage] = useState('dashboard');
  const [currentExam, setCurrentExam] = useState('monthly');
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState({});
  const [exams, setExams] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [attendanceSearch, setAttendanceSearch] = useState('');
  const [examSearch, setExamSearch] = useState('');
  const [editingStudent, setEditingStudent] = useState(null);
  const [showAddStudent, setShowAddStudent] = useState(false);
  const [newStudent, setNewStudent] = useState({ name:'', phone:'', notes:'', age:'5' });
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  const [pendingChanges, setPendingChanges] = useState([]);
  const [lockedSessions, setLockedSessions] = useState(Array(12).fill(true));
  const [copiedCode, setCopiedCode] = useState(null);
  const [studentCode, setStudentCode] = useState('');
  const [studentResult, setStudentResult] = useState(null);
  const [resultError, setResultError] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [scannedCode, setScannedCode] = useState('');
  const [showConfirmSearch, setShowConfirmSearch] = useState(false);
  const [showQRModal, setShowQRModal] = useState(false);
  const [selectedStudentForQR, setSelectedStudentForQR] = useState(null);
  const [showScanner, setShowScanner] = useState(false);
  const [selectedSession, setSelectedSession] = useState(1);
  const [scannerError, setScannerError] = useState('');
  const [scanSuccess, setScanSuccess] = useState('');
  const [scannedStudentData, setScannedStudentData] = useState(null);
  const [showAbsentModal, setShowAbsentModal] = useState(false);
  const [selectedSessionAbsent, setSelectedSessionAbsent] = useState(null);
  const [isScanPaused, setIsScanPaused] = useState(false);
  const html5QrCodeRef = useRef(null);
  const successAudioRef = useRef(null);
  const isScanPausedRef = useRef(false);

  // ── Lessons state ────────────────────────────
  const [chants, setChants] = useState([]);
  const [editingChant, setEditingChant] = useState(null);
  const [chantForm, setChantForm] = useState({
    name: '', drive_url: '', notes: '', order_num: 0, is_published: true
  });
  const [expandedChant, setExpandedChant] = useState(null);
  const [chantSearch, setChantSearch] = useState('');
  // For public page: show grades inline
  const [publicStudentCode, setPublicStudentCode] = useState('');
  const [publicStudentResult, setPublicStudentResult] = useState(null);
  const [publicResultError, setPublicResultError] = useState('');
  const [publicSearching, setPublicSearching] = useState(false);
  const [showPublicGrades, setShowPublicGrades] = useState(false);

  // ── Effects ──────────────────────────────────
  useEffect(() => { checkLoginStatus(); }, []);

  // تحميل الألحان مسبقاً عشان تظهر فوراً في صفحة الطلاب
  useEffect(() => {
    supabase.from('chants').select('*').eq('is_published', true).order('order_num').order('name')
      .then(({ data }) => { if (data?.length) setChants(data); });
  }, []);

  useEffect(() => {
    const handleOnline = () => { setIsOffline(false); toast.success('عُدت للإنترنت! 🔄'); syncPendingChanges(); };
    const handleOffline = () => { setIsOffline(true); toast.error('انقطع الإنترنت! 📴', { duration: 5000 }); };
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    const saved = localStorage.getItem('pendingAttendance');
    if (saved) setPendingChanges(JSON.parse(saved));
    return () => { window.removeEventListener('online', handleOnline); window.removeEventListener('offline', handleOffline); };
  }, []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    let isMounted = true;
    const preloadScanner = async () => {
      if (!isMounted) return;
      try {
        const testDiv = document.createElement('div');
        testDiv.id = 'qr-preload-test'; testDiv.style.display = 'none';
        document.body.appendChild(testDiv);
        const testScanner = new Html5Qrcode('qr-preload-test');
        await new Promise(r => setTimeout(r, 100));
        if (isMounted && testScanner) await testScanner.clear();
        if (document.body.contains(testDiv)) document.body.removeChild(testDiv);
      } catch (e) { console.log('Scanner preload skipped:', e.message); }
    };
    preloadScanner();
    return () => { isMounted = false; };
  }, []);

  useEffect(() => {
    if (isLoggedIn) loadAllData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn]);

  useEffect(() => {
    return () => { if (html5QrCodeRef.current) html5QrCodeRef.current.stop().catch(() => {}); };
  }, []);

  useEffect(() => {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const createBeep = () => {
      const osc = audioContext.createOscillator();
      const gain = audioContext.createGain();
      osc.connect(gain); gain.connect(audioContext.destination);
      osc.frequency.value = 800; osc.type = 'sine';
      gain.gain.setValueAtTime(0.3, audioContext.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
      osc.start(audioContext.currentTime); osc.stop(audioContext.currentTime + 0.3);
    };
    successAudioRef.current = { play: createBeep };
    return () => { audioContext.close(); };
  }, []);

  // ── Core logic ────────────────────────────────
  const checkLoginStatus = () => {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) { setCurrentUser(JSON.parse(savedUser)); setIsLoggedIn(true); }
    setLoading(false);
  };

  const handleLogin = async (e) => {
    e.preventDefault(); setLoginError(''); setIsLoggingIn(true);
    try {
      const { error: authError } = await supabase.auth.signInWithPassword({ email: loginUsername.trim(), password: loginPassword });
      if (authError) { setLoginError('البريد أو كلمة المرور غير صحيحة'); setIsLoggingIn(false); return; }
      const { data: userData, error: userError } = await supabase.from('users').select('*').eq('username', loginUsername.trim()).single();
      if (userError || !userData) { setLoginError('المستخدم غير موجود'); setIsLoggingIn(false); return; }
      const user = { id: userData.id, username: userData.username, name: userData.name, role: userData.role };
      setCurrentUser(user); localStorage.setItem('currentUser', JSON.stringify(user));
      setIsLoggedIn(true); setLoginUsername(''); setLoginPassword('');
    } catch { setLoginError('حدث خطأ أثناء تسجيل الدخول'); }
    finally { setIsLoggingIn(false); }
  };

  const handleLogout = () => { setIsLoggedIn(false); setCurrentUser(null); localStorage.removeItem('currentUser'); setCurrentPage('dashboard'); };

  const loadAllData = async () => {
    setLoading(true);
    try { await Promise.all([loadStudents(), loadAttendance(), loadExams(), loadChants()]); }
    catch { toast.error('خطأ في تحميل البيانات!'); }
    finally { setLoading(false); }
  };

  const loadStudents = async () => { const { data } = await supabase.from('students').select('*').order('id'); setStudents(data || []); };
  const loadAttendance = async () => {
    const { data } = await supabase.from('attendance').select('*');
    const map = {}; data?.forEach(item => { map[item.student_id] = item.sessions || Array(12).fill(false); }); setAttendance(map);
  };
  const loadExams = async () => {
    const { data } = await supabase.from('exams').select('*');
    const map = {};
    data?.forEach(row => {
      map[row.student_id] = {
        monthly: { coptic: row.m_coptic||0, liturgy: row.m_liturgy||0, oral: row.m_oral||0, bonus: row.m_bonus||0 },
        final:   { coptic: row.f_coptic||0, liturgy: row.f_liturgy||0, oral: row.f_oral||0, bonus: row.f_bonus||0 },
      };
    });
    setExams(map);
  };

  // ── Chants CRUD ───────────────────────────────
  const loadChants = async () => {
    const { data } = await supabase.from('chants').select('*').order('order_num').order('name');
    setChants(data || []);
  };

  const driveAudioUrl = (url) => {
    if (!url) return '';
    const m = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
    if (m) return `https://drive.google.com/file/d/${m[1]}/preview`;
    return url;
  };

  const saveChant = async () => {
    if (!chantForm.name.trim()) { toast.error('أدخل اسم اللحن!'); return; }
    if (!chantForm.drive_url.trim()) { toast.error('أدخل رابط الصوت!'); return; }
    const tid = toast.loading('جاري الحفظ...');
    try {
      const payload = {
        name: chantForm.name.trim(),
        drive_url: chantForm.drive_url.trim(),
        notes: chantForm.notes.trim(),
        order_num: parseInt(chantForm.order_num) || 0,
        is_published: chantForm.is_published,
      };
      if (editingChant) {
        await supabase.from('chants').update(payload).eq('id', editingChant.id);
        toast.success('تم التحديث! ✏️', { id: tid });
      } else {
        await supabase.from('chants').insert([payload]);
        toast.success('تمت الإضافة! ✅', { id: tid });
      }
      await loadChants();
      setEditingChant(null);
      setChantForm({ name: '', drive_url: '', notes: '', order_num: 0, is_published: true });
    } catch { toast.error('حدث خطأ!', { id: tid }); }
  };

  const deleteChant = async (id) => {
    if (!window.confirm('هل تريد حذف هذا اللحن؟')) return;
    const tid = toast.loading('جاري الحذف...');
    try {
      await supabase.from('chants').delete().eq('id', id);
      await loadChants();
      toast.success('تم الحذف! 🗑️', { id: tid });
    } catch { toast.error('حدث خطأ!', { id: tid }); }
  };

  const startEditChant = (chant) => {
    setEditingChant(chant);
    setChantForm({
      name: chant.name || '',
      drive_url: chant.drive_url || '',
      notes: chant.notes || '',
      order_num: chant.order_num || 0,
      is_published: chant.is_published !== false,
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // ── Public student search (for chants page) ──
  const searchPublicStudent = async () => {
    setPublicResultError('');
    setPublicStudentResult(null);
    if (!publicStudentCode.trim()) { setPublicResultError('أدخل الكود'); return; }
    setPublicSearching(true);
    try {
      const { data: sd, error: se } = await supabase.from('students').select('id, name, age, student_code').eq('student_code', publicStudentCode.trim().toUpperCase()).single();
      if (se || !sd) { setPublicResultError('❌ الكود غير صحيح!'); setPublicSearching(false); return; }
      const [allAtt, attRes, exRes] = await Promise.all([
        supabase.from('attendance').select('sessions'),
        supabase.from('attendance').select('sessions').eq('student_id', sd.id).maybeSingle(),
        supabase.from('exams').select('*').eq('student_id', sd.id).maybeSingle()
      ]);
      let actualSessions = 0;
      if (allAtt.data?.length > 0) {
        for (let i = 0; i < 12; i++) { if (allAtt.data.some(r => Array.isArray(r.sessions) && r.sessions[i] === true)) actualSessions++; }
      }
      const sessions = attRes.data?.sessions || [];
      const attended = Array.isArray(sessions) ? sessions.filter(Boolean).length : 0;
      const total = actualSessions > 0 ? actualSessions : 12;
      const attScore = ((attended / total) * 30).toFixed(2);
      const ex = exRes.data || {};
      const mRaw = (ex.m_coptic||0)+(ex.m_liturgy||0)+(ex.m_oral||0);
      const fRaw = (ex.f_coptic||0)+(ex.f_liturgy||0)+(ex.f_oral||0);
      const mBonus = ex.m_bonus||0; const fBonus = ex.f_bonus||0;
      const base = ((parseFloat(attScore) + mRaw + fRaw) / 110 * 100);
      const tot = (base + mBonus + fBonus).toFixed(2);
      setPublicStudentResult({
        name: sd.name, age: sd.age, attendance: attScore, attendedCount: attended, totalSessions: total,
        monthly: { coptic:ex.m_coptic||0, liturgy:ex.m_liturgy||0, oral:ex.m_oral||0, bonus:mBonus, total:mRaw.toFixed(1) },
        final:   { coptic:ex.f_coptic||0, liturgy:ex.f_liturgy||0, oral:ex.f_oral||0, bonus:fBonus, total:fRaw.toFixed(1) },
        total: tot, grade: getGrade(parseFloat(tot))
      });
      setShowPublicGrades(true);
    } catch { setPublicResultError('⚠️ حدث خطأ. حاول مرة أخرى'); }
    finally { setPublicSearching(false); }
  };

  // Helper: YouTube embed
  const ytEmbed = (url) => {
    if (!url) return '';
    const m = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/);
    if (m) return `https://www.youtube.com/embed/${m[1]}`;
    return url;
  };
  // Helper: parse multi-line URLs
  const parseUrls = (str) => str ? str.split(/[\n,]+/).map(u => u.trim()).filter(Boolean) : [];
  // Helper: Drive embed
  const driveEmbedUrl = (url) => {
    if (!url) return '';
    const m = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
    if (m) return `https://drive.google.com/file/d/${m[1]}/preview`;
    return url;
  };

  const generateStudentCode = () => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let c = ''; for (let i=0; i<6; i++) c += chars.charAt(Math.floor(Math.random()*chars.length));
    const existing = students.map(s => s.student_code);
    if (existing.includes(`TEN-${c}`)) return generateStudentCode();
    return `TEN-${c}`;
  };

  const addStudent = async () => {
    if (!newStudent.name.trim()) { toast.error('أدخل اسم الطالب!'); return; }
    const tid = toast.loading('جاري الإضافة...');
    try {
      await supabase.from('students').insert([{ ...newStudent, student_code: generateStudentCode() }]);
      await loadStudents(); setNewStudent({ name:'', phone:'', notes:'', age:'5' }); setShowAddStudent(false);
      toast.success('تم الإضافة! ✅', { id: tid });
    } catch { toast.error('حدث خطأ!', { id: tid }); }
  };

  const deleteStudent = async (id) => {
    if (!window.confirm('هل أنت متأكد من حذف هذا الطالب؟')) return;
    const tid = toast.loading('جاري الحذف...');
    try { await supabase.from('students').delete().eq('id', id); await loadStudents(); toast.success('تم الحذف! 🗑️', { id: tid }); }
    catch { toast.error('حدث خطأ!', { id: tid }); }
  };

  const updateStudent = async () => {
    const tid = toast.loading('جاري التحديث...');
    try {
      await supabase.from('students').update({ name: editingStudent.name, phone: editingStudent.phone, notes: editingStudent.notes, age: editingStudent.age }).eq('id', editingStudent.id);
      await loadStudents(); setEditingStudent(null); toast.success('تم التحديث! ✏️', { id: tid });
    } catch { toast.error('حدث خطأ!', { id: tid }); }
  };

  const toggleAttendance = async (studentId, sessionIndex) => {
    if (lockedSessions[sessionIndex]) return;
    const current = attendance[studentId] || Array(12).fill(false);
    const updated = current.map((v, i) => i === sessionIndex ? !v : v);
    setAttendance(prev => ({ ...prev, [studentId]: updated }));
    if (isOffline) {
      const change = { type:'attendance', studentId, sessions: updated, timestamp: Date.now() };
      const np = [...pendingChanges, change]; setPendingChanges(np);
      localStorage.setItem('pendingAttendance', JSON.stringify(np));
      toast('💾 تم الحفظ محلياً!', { icon: '✅' }); return;
    }
    try {
      const { data: ex } = await supabase.from('attendance').select('id').eq('student_id', studentId).limit(1).maybeSingle();
      if (ex) await supabase.from('attendance').update({ sessions: updated }).eq('student_id', studentId);
      else await supabase.from('attendance').insert([{ student_id: studentId, sessions: updated }]);
    } catch { toast.error('خطأ في الحفظ!'); }
  };

  const syncPendingChanges = async () => {
    if (pendingChanges.length === 0) return;
    toast.loading('جاري المزامنة...', { id: 'sync' });
    const ok = [], fail = []; let cnt = 0;
    try {
      for (const ch of pendingChanges) {
        try {
          if (ch.type === 'attendance') {
            const { data: ex, error: fe } = await supabase.from('attendance').select('id').eq('student_id', ch.studentId).limit(1).maybeSingle();
            if (fe) throw fe;
            if (ex) { const { error: ue } = await supabase.from('attendance').update({ sessions: ch.sessions }).eq('student_id', ch.studentId); if (ue) throw ue; }
            else { const { error: ie } = await supabase.from('attendance').insert([{ student_id: ch.studentId, sessions: ch.sessions }]); if (ie) throw ie; }
            ok.push(ch); cnt++;
          }
        } catch { if (Date.now() - ch.timestamp < 7*24*60*60*1000) fail.push(ch); }
      }
      setPendingChanges(fail);
      if (fail.length > 0) { localStorage.setItem('pendingAttendance', JSON.stringify(fail)); toast.error(`مزامنة ${cnt}/${pendingChanges.length}`, { id:'sync', duration:4000 }); }
      else { localStorage.removeItem('pendingAttendance'); toast.success(`تم المزامنة ✅ (${cnt})`, { id:'sync' }); }
      if (ok.length > 0) await loadAttendance();
    } catch { toast.error('فشلت المزامنة!', { id:'sync' }); }
  };

  const toggleSessionLock = (i) => setLockedSessions(prev => prev.map((l, idx) => idx === i ? !l : l));

  const selectAllForSession = async (sessionIndex) => {
    if (lockedSessions[sessionIndex]) return;
    const upd = {}; const ups = [];
    for (const s of students) {
      const cur = attendance[s.id] || Array(12).fill(false);
      const u = cur.map((v, i) => i === sessionIndex ? true : v);
      upd[s.id] = u;
      const { data: ex } = await supabase.from('attendance').select('id').eq('student_id', s.id).limit(1).maybeSingle();
      ups.push(ex ? supabase.from('attendance').update({ sessions: u }).eq('student_id', s.id) : supabase.from('attendance').insert([{ student_id: s.id, sessions: u }]));
    }
    setAttendance(prev => ({ ...prev, ...upd })); await Promise.all(ups);
  };

  const updateExamScore = async (studentId, examType, field, value) => {
    const cur = exams[studentId]?.[examType] || { coptic:0, liturgy:0, oral:0, bonus:0 };
    const upd = { ...cur, [field]: parseFloat(value)||0 };
    setExams(prev => ({ ...prev, [studentId]: { ...prev[studentId], [examType]: upd } }));
    // DB column: monthly+coptic → m_coptic, final+oral → f_oral
    const prefix = examType === 'monthly' ? 'm' : 'f';
    const col = `${prefix}_${field}`;
    const { error } = await supabase.from('exams')
      .upsert({ student_id: studentId, [col]: parseFloat(value)||0 }, { onConflict: 'student_id' });
    if (error) toast.error('خطأ في الحفظ!');
  };

  const calcAtt = useMemo(() => {
    return (sid) => {
      const a = attendance[sid]?.filter(Boolean).length||0;
      return ((a/12)*30).toFixed(2);
    };
  }, [attendance]);

  const calcTotal = useMemo(() => {
    return (sid) => {
      const att   = parseFloat(calcAtt(sid));
      const m  = exams[sid]?.monthly || {};
      const f  = exams[sid]?.final   || {};
      const mRaw = (m.coptic||0)+(m.liturgy||0)+(m.oral||0);
      const fRaw = (f.coptic||0)+(f.liturgy||0)+(f.oral||0);
      const mBonus = m.bonus||0;
      const fBonus = f.bonus||0;
      // تحويل: (حضور30 + شهر30 + فاينال50) ÷ 110 × 100 + بونص
      const base = ((att + mRaw + fRaw) / 110 * 100);
      return (base + mBonus + fBonus).toFixed(2);
    };
  }, [attendance, exams, calcAtt]);
  const getGrade = (s) => {
    if (s >= 85) return { text:'ممتاز',    color:'var(--green)' };
    if (s >= 75) return { text:'جيد جداً', color:'var(--teal)' };
    if (s >= 65) return { text:'جيد',      color:'var(--gold)' };
    if (s >= 50) return { text:'مقبول',    color:'#f59e0b' };
    return { text:'⏳⏳', color:'var(--rose)' };
  };

  const copyToClipboard = (code) => {
    navigator.clipboard.writeText(code); setCopiedCode(code);
    toast.success('تم النسخ! 📋'); setTimeout(() => setCopiedCode(null), 2000);
  };

  const searchStudentByCodePublic = async () => {
    setResultError(''); setStudentResult(null);
    if (!studentCode.trim()) { setResultError('أدخل الكود'); return; }
    try {
      const { data: sd, error: se } = await supabase.from('students').select('id, name, age, student_code').eq('student_code', studentCode.trim().toUpperCase()).single();
      if (se || !sd) { setResultError('❌ الكود غير صحيح!'); return; }
      const [allAtt, attRes, exRes] = await Promise.all([
        supabase.from('attendance').select('sessions'),
        supabase.from('attendance').select('sessions').eq('student_id', sd.id).maybeSingle(),
        supabase.from('exams').select('*').eq('student_id', sd.id).maybeSingle()
      ]);
      let actualSessions = 0;
      if (allAtt.data?.length > 0) {
        for (let i=0; i<12; i++) { if (allAtt.data.some(r => Array.isArray(r.sessions) && r.sessions[i]===true)) actualSessions++; }
      }
      const sessions = attRes.data?.sessions || [];
      const attended = Array.isArray(sessions) ? sessions.filter(Boolean).length : 0;
      const total = actualSessions > 0 ? actualSessions : 12;
      const attScore = ((attended/total)*30).toFixed(2);
      const ex = exRes.data || {};
      const mRaw2 = (ex.m_coptic||0)+(ex.m_liturgy||0)+(ex.m_oral||0);
      const fRaw2 = (ex.f_coptic||0)+(ex.f_liturgy||0)+(ex.f_oral||0);
      const mB2 = ex.m_bonus||0; const fB2 = ex.f_bonus||0;
      const base2 = ((parseFloat(attScore)+mRaw2+fRaw2)/110*100);
      const tot = (base2+mB2+fB2).toFixed(2);
      setStudentResult({
        name:sd.name, age:sd.age, attendance:attScore, attendedCount:attended, totalSessions:total,
        monthly:{ coptic:ex.m_coptic||0, liturgy:ex.m_liturgy||0, oral:ex.m_oral||0, bonus:mB2, total:mRaw2.toFixed(1) },
        final:  { coptic:ex.f_coptic||0, liturgy:ex.f_liturgy||0, oral:ex.f_oral||0, bonus:fB2, total:fRaw2.toFixed(1) },
        total:tot, grade:getGrade(parseFloat(tot))
      });
    } catch { setResultError('⚠️ حدث خطأ. حاول مرة أخرى'); }
  };

  const searchStudentByCodeAdmin = () => {
    setResultError(''); setStudentResult(null);
    if (!studentCode.trim()) { setResultError('أدخل الكود'); return; }
    const s = students.find(st => st.student_code === studentCode.trim().toUpperCase());
    if (!s) { setResultError('الكود غير صحيح!'); return; }
    const as = calcAtt(s.id);
    const md = exams[s.id]?.monthly || {coptic:0,liturgy:0,oral:0,bonus:0};
    const fd = exams[s.id]?.final   || {coptic:0,liturgy:0,oral:0,bonus:0};
    const mRaw3 = (md.coptic||0)+(md.liturgy||0)+(md.oral||0);
    const fRaw3 = (fd.coptic||0)+(fd.liturgy||0)+(fd.oral||0);
    const base3 = ((parseFloat(as)+mRaw3+fRaw3)/110*100);
    const tot = (base3+(md.bonus||0)+(fd.bonus||0)).toFixed(2);
    setStudentResult({
      name:s.name, age:s.age, attendance:as,
      monthly:{...md, total:mRaw3.toFixed(1)},
      final:{...fd, total:fRaw3.toFixed(1)},
      total:tot, grade:getGrade(parseFloat(tot))
    });
  };

  const showStudentQR = (s) => { setSelectedStudentForQR(s); setShowQRModal(true); };
  const downloadQRCode = () => {
    const c = document.getElementById('qr-code-canvas');
    if (c) { const l=document.createElement('a'); l.download=`${selectedStudentForQR.name}_QR.png`; l.href=c.toDataURL('image/png'); l.click(); toast.success('تم التحميل! 📊'); }
  };

  const startScanner = async () => {
     isScanPausedRef.current = false;
  setScannerError(''); setScanSuccess(''); setScannedStudentData(null); setIsScanPaused(false); setShowScanner(true);
  try {
    await new Promise(r => setTimeout(r, 100));

    if (html5QrCodeRef.current) {
      try { await html5QrCodeRef.current.stop(); } catch {}
      try { await html5QrCodeRef.current.clear(); } catch {}
      html5QrCodeRef.current = null;
    }

    const rid = (!isLoggedIn && (currentPage==='student-check' || currentPage==='public-lessons')) ? 'qr-reader-public' : 'qr-reader';
    let attempts=0, el=null;
    while (attempts<5 && !el) { el=document.getElementById(rid); if(!el){ await new Promise(r=>setTimeout(r,80)); attempts++; } }
    if (!el) throw new Error('عنصر الكاميرا غير موجود');

    el.innerHTML = '';
    await new Promise(r => setTimeout(r, 50));

    html5QrCodeRef.current = new Html5Qrcode(rid);
    await html5QrCodeRef.current.start(
      { facingMode:'environment' },
      { fps:10, qrbox:{width:240,height:240}, aspectRatio:1.0, disableFlip:false },
      onScanSuccess,
      (e)=>{ if(!e.includes('No MultiFormat')) console.log(e); }
    );
  } catch (err) {
    setScannerError('فشل فتح الكاميرا — تأكد من الصلاحيات'); setShowScanner(false);
    if (html5QrCodeRef.current) {
      try { await html5QrCodeRef.current.stop(); } catch {}
      try { await html5QrCodeRef.current.clear(); } catch {}
      html5QrCodeRef.current = null;
    }
  }
};

  const pauseScanner = () => {
  isScanPausedRef.current = true;
  setIsScanPaused(true);
  if (html5QrCodeRef.current) {
    try { html5QrCodeRef.current.pause(true); } catch {}
  }
};
  const stopScanner = async () => {
    isScanPausedRef.current = false;
    if (html5QrCodeRef.current) { 
      try { await html5QrCodeRef.current.stop(); } catch{}
      try { await html5QrCodeRef.current.clear(); } catch{}
      html5QrCodeRef.current = null;
    }
    setShowScanner(false); setScannerError(''); setScanSuccess(''); setScannedStudentData(null); setIsScanPaused(false);
};

  const onScanSuccess = async (decodedText) => {
    if (isScanPausedRef.current) return { success:false };
isScanPausedRef.current = true;
setIsScanPaused(true);

    if (!isLoggedIn && (currentPage==='student-check' || currentPage==='public-lessons')) {
      const tid = toast.loading('⏳ جاري التحقق...');
      await stopScanner();
      try {
        const { data:sd, error:se } = await supabase.from('students').select('id,name,student_code').eq('student_code',decodedText.trim().toUpperCase()).limit(1).single();
        if (se||!sd) { toast.error('الكود غير صحيح!', {id:tid}); setResultError('الكود غير صحيح!'); return {success:false}; }
        setScannedCode(decodedText); setStudentCode(decodedText);
        sessionStorage.setItem('tempStudentName', sd.name); setShowConfirmSearch(true);
        toast.success('تم! ✅', {id:tid, duration:2000}); return {success:true};
      } catch { toast.error('حدث خطأ!', {id:tid}); return {success:false}; }
    }
    if (isLoggedIn && currentPage==='student-check') {
      await stopScanner(); setStudentCode(decodedText);
      toast.loading('جاري البحث...', {duration:800});
      setTimeout(() => searchStudentByCodeAdmin(), 800); return {success:true};
    }
    const LOCK = `scan_lock_${decodedText}_${selectedSession}`;
    const exLock = sessionStorage.getItem(LOCK);
    if (exLock && Date.now()-parseInt(exLock)<3000) { toast.error('⏳ استنى...'); return {success:false}; }
    sessionStorage.setItem(LOCK, Date.now().toString());
    const student = students.find(s => s.student_code===decodedText);
    if (!student) { setScannedStudentData({success:false,message:'❌ كود غير صحيح!',type:'error'}); toast.error('❌ كود غير صحيح!'); sessionStorage.removeItem(LOCK); return {success:false}; }
    const si = selectedSession-1;
    if (lockedSessions[si]) { setScannedStudentData({success:false,message:'🔒 الحصة مقفولة!',studentName:student.name,type:'locked'}); toast.error('🔒 الحصة مقفولة!'); sessionStorage.removeItem(LOCK); return {success:false}; }
    try {
      const { data:la, error:fe } = await supabase.from('attendance').select('sessions').eq('student_id',student.id).maybeSingle();
      if (fe && fe.code !== 'PGRST116') { sessionStorage.removeItem(LOCK); throw new Error('فشل التحقق'); }
      const cur = la?.sessions || Array(12).fill(false);
      if (cur[si]===true) { setScannedStudentData({success:false,message:'⚠️ مسجل من قبل!',studentName:student.name,session:selectedSession,type:'already_registered'}); toast.error(`⚠️ ${student.name} - مسجل!`,{duration:2000}); sessionStorage.removeItem(LOCK); return {success:false}; }
      const upd = cur.map((v,i) => i===si?true:v);
      const { data:ex } = await supabase.from('attendance').select('id').eq('student_id',student.id).maybeSingle();
      if (ex) { const {error:ue}=await supabase.from('attendance').update({sessions:upd}).eq('student_id',student.id); if(ue) throw new Error('فشل التحديث'); }
      else { const {error:ie}=await supabase.from('attendance').insert([{student_id:student.id,sessions:upd}]); if(ie) throw new Error('فشل الإضافة'); }
      setAttendance(prev=>({...prev,[student.id]:upd}));
      setScannedStudentData({success:true, message:'✅ تم تسجيل الحضور!', studentName:student.name, session:selectedSession, type:'success'});
toast.success(`✅ ${student.name} - حاضر!`, {duration:2000});
if (successAudioRef.current) { try { successAudioRef.current.play(); } catch{} }
sessionStorage.removeItem(LOCK);
return {success:true};
    } catch (err) {
      toast.error(`❌ ${err.message||'حدث خطأ!'}`,{duration:3000});
      setScannedStudentData({success:false,message:`❌ ${err.message||'حدث خطأ!'}`,studentName:student.name,type:'error'});
      sessionStorage.removeItem(LOCK); return {success:false};
    }
  };

  const resumeScanning = async () => {
      isScanPausedRef.current = false; 
  setScannedStudentData(null);
  setScannerError('');
  setScanSuccess('');
  setIsScanPaused(false);

  if (html5QrCodeRef.current) {
    try { await html5QrCodeRef.current.stop(); } catch {}
    try { await html5QrCodeRef.current.clear(); } catch {}
    html5QrCodeRef.current = null;
  }

  await new Promise(r => setTimeout(r, 300));

  const el = document.getElementById('qr-reader');
  if (el) el.innerHTML = '';

  await startScanner();
};

  // Helpers
  const filteredStudents = students.filter(s => s.name.toLowerCase().includes(searchTerm.toLowerCase()));
  const filteredAttendanceStudents = students.filter(s => s.name.toLowerCase().includes(attendanceSearch.toLowerCase()));
  const filteredExamStudents = students.filter(s => s.name.toLowerCase().includes(examSearch.toLowerCase()));
  const showAbsentStudents = (i) => { setSelectedSessionAbsent(i); setShowAbsentModal(true); };
  const getAbsentStudents = (i) => students.filter(s => !attendance[s.id]?.[i]);

  const printAllQRCodes = () => {
    const win = window.open('','_blank');
    win.document.write(`<!DOCTYPE html><html dir="rtl"><head><meta charset="UTF-8"><title>QR Codes</title>
    <style>@media print{@page{margin:10mm;}}body{font-family:Arial;padding:20px;}.g{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;}.i{text-align:center;page-break-inside:avoid;border:2px solid #eee;padding:15px;border-radius:10px;}.n{font-weight:bold;margin-top:10px;font-size:14px;}.c{color:#666;font-size:12px;margin-top:5px;}</style>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js"></script></head><body>
    <h1 style="text-align:center;margin-bottom:30px;">QR Codes</h1>
    <div class="g" id="c"></div>
    <script>const ss=${JSON.stringify(students)};const c=document.getElementById('c');ss.forEach((s,i)=>{const d=document.createElement('div');d.className='i';d.innerHTML='<div id="q'+i+'"></div><div class="n">'+s.name+'</div><div class="c">'+(s.student_code||'-')+'</div>';c.appendChild(d);new QRCode(document.getElementById('q'+i),{text:s.student_code||'NO-CODE',width:180,height:180,correctLevel:QRCode.CorrectLevel.H});});setTimeout(()=>window.print(),1000);</script></body></html>`);
    win.document.close(); toast.success('تم فتح صفحة الطباعة! 🖨️');
  };

  const exportStudentsToExcel = () => {
    const data = students.map((s,i)=>({'#':i+1,'الاسم':s.name,'الكود':s.student_code||'-','السن':s.age||'-','الهاتف':s.phone||'-','ملاحظات':s.notes||'-'}));
    const ws = XLSX.utils.json_to_sheet(data); const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb,ws,'الطلاب'); ws['!cols']=[{wch:5},{wch:25},{wch:15},{wch:8},{wch:15},{wch:30}];
    XLSX.writeFile(wb,'بيانات_الطلاب.xlsx'); toast.success('تم التصدير! 📑');
  };

  const exportToGoogleSheets = () => {
    toast.loading('جاري التحضير...', {id:'sh'});
    const headers=['#','الاسم','الكود','السن','الحضور/30','شهري1/10','شهري2/10','نهائي/50','المجموع/100','التقدير'];
    const rows = students.map((s,i)=>{
      const tot=calcTotal(s.id); const gr=getGrade(parseFloat(tot));
      return [i+1,s.name,s.student_code||'-',s.age||'-',calcAtt(s.id),
        ((exams[s.id]?.monthly?.coptic||0)+(exams[s.id]?.monthly?.liturgy||0)+(exams[s.id]?.monthly?.oral||0)).toFixed(1),
        ((exams[s.id]?.final?.coptic||0)+(exams[s.id]?.final?.liturgy||0)+(exams[s.id]?.final?.oral||0)).toFixed(1),
        tot,gr.text];
    });
    let csv=headers.join(',')+'\n';
    rows.forEach(r=>{csv+=r.map(c=>`"${c}"`).join(',')+'\n';});
    toast.success('📊 هيتم تحميل الملف!', {id:'sh',duration:5000});
    if (window.confirm('هيتم تحميل ملف CSV\nافتحه في Google Sheets → File → Import\nعايز تفتح Google Sheets دلوقتي؟')) window.open('https://docs.google.com/spreadsheets/create','_blank');
    const blob=new Blob(['\ufeff'+csv],{type:'text/csv;charset=utf-8;'});
    const l=document.createElement('a'); l.href=URL.createObjectURL(blob); l.download=`نتائج_${new Date().toISOString().split('T')[0]}.csv`; l.click();
    toast.success('تم التحميل! 📥',{duration:4000});
  };

  const exportToCSV = () => {
    let csv='الكود,الاسم,السن,الحضور,شهري1,شهري2,نهائي,المجموع,التقدير\n';
    students.forEach(s=>{
      const tot=calcTotal(s.id); const gr=getGrade(parseFloat(tot));
      csv+=`${s.student_code||'-'},${s.name},${s.age||'-'},${calcAtt(s.id)},${((exams[s.id]?.monthly?.coptic||0)+(exams[s.id]?.monthly?.liturgy||0)+(exams[s.id]?.monthly?.oral||0)).toFixed(1)},${((exams[s.id]?.final?.coptic||0)+(exams[s.id]?.final?.liturgy||0)+(exams[s.id]?.final?.oral||0)).toFixed(1)},${tot},${gr.text}\n`;
    });
    const blob=new Blob(['\ufeff'+csv],{type:'text/csv;charset=utf-8;'});
    const l=document.createElement('a'); l.href=URL.createObjectURL(blob); l.download='نتائج_الطلاب.csv'; l.click();
  };

  const examConfigs = [
    { type:'monthly', title:'امتحان الشهر', color:'#3b82f6',
      fields:[
        { key:'coptic',  label:'قبطي',   max:10 },
        { key:'liturgy', label:'طقس',    max:10 },
        { key:'oral',    label:'تسميع',  max:10 },
        { key:'bonus',   label:'بونص 🎁', max:null },
      ], total:30 },
    { type:'final', title:'امتحان الفاينال', color:'#f43f5e',
      fields:[
        { key:'coptic',  label:'قبطي',   max:15 },
        { key:'liturgy', label:'طقس',    max:15 },
        { key:'oral',    label:'تسميع',  max:20 },
        { key:'bonus',   label:'بونص 🎁', max:null },
      ], total:50 },
  ];
  const examCfg = examConfigs.find(e => e.type===currentExam);

  const navItems = [
    { id:'dashboard',     icon:BarChart3,    label:'الإحصائيات', emoji:'📊' },
    { id:'students',      icon:Users,        label:'الطلاب',      emoji:'👥' },
    { id:'attendance',    icon:ClipboardList,label:'الحضور',      emoji:'📋' },
    { id:'qr-scanner',   icon:Camera,       label:'Scan QR',     emoji:'📷' },
    { id:'exams',        icon:FileText,     label:'الامتحانات',  emoji:'📝' },
    { id:'lessons',      icon:BookOpen,     label:'الألحان',      emoji:'🎵' },
    { id:'results',      icon:BarChart3,    label:'النتائج',     emoji:'🏆' },
    { id:'student-check',icon:Key,          label:'استعلام',     emoji:'🔍' },
  ];

  /* ══════════════════════════════════════════════
     LOGIN PAGE
  ══════════════════════════════════════════════ */
  if (!isLoggedIn && currentPage !== 'student-check' && currentPage !== 'public-lessons') {
    return (
      <>
        <GlobalStyles />
        <BgDeco isDark={isDark} />
        <div style={{ minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', padding:16, position:'relative', zIndex:1 }} dir="rtl">
        <div style={{ width:'100%', maxWidth:420, animation:'fadeUp .55s cubic-bezier(.16,1,.3,1) both' }}>
            <div className="login-card">
              {/* Logo */}
              <div style={{ textAlign:'center', marginBottom:28 }}>
                <div style={{ width:80, height:80, margin:'0 auto 14px', borderRadius:'50%', overflow:'hidden', border:'2.5px solid var(--border-g)', boxShadow:`0 0 24px var(--gold-glow)` }}>
                  <img src="https://i.postimg.cc/SN8hss4C/2.jpg" alt="" style={{ width:'100%', height:'100%', objectFit:'cover' }} onError={e=>e.target.style.display='none'} />
                </div>
                <h1 className="shimmer" style={{ fontSize:26, fontWeight:900, marginBottom:4 }}>مدرسة الألحان</h1>
                <p style={{ color:'var(--muted)', fontSize:13 }}>تين اويه انسوك</p>
                <div style={{ width:48, height:2.5, background:'linear-gradient(90deg,var(--gold),var(--violet))', borderRadius:99, margin:'12px auto 0' }} />
              </div>

              <form onSubmit={handleLogin} style={{ display:'flex', flexDirection:'column', gap:13 }}>
                <div>
                  <label style={{ display:'block', marginBottom:6, fontWeight:700, fontSize:12, color:'var(--muted)' }}>البريد الإلكتروني</label>
                  <input className="inp" type="text" value={loginUsername} onChange={e=>setLoginUsername(e.target.value)} placeholder="Email " required disabled={isLoggingIn} />
                </div>
                <div>
                  <label style={{ display:'block', marginBottom:6, fontWeight:700, fontSize:12, color:'var(--muted)' }}>كلمة المرور</label>
                  <input className="inp" type="password" value={loginPassword} onChange={e=>setLoginPassword(e.target.value)} placeholder="••••••••" required disabled={isLoggingIn} />
                </div>
                {loginError && (
                  <div style={{ background:'rgba(244,63,94,.1)', border:'1px solid rgba(244,63,94,.35)', borderRadius:9, padding:'10px 14px', color:'var(--rose)', fontSize:13, textAlign:'center' }}>
                    {loginError}
                  </div>
                )}
                <button type="submit" disabled={isLoggingIn} className="btn btn-gold btn-lg" style={{ width:'100%', marginTop:4, fontSize:16, fontWeight:900 }}>
                  {isLoggingIn
                    ? <><span className="anim-spin" style={{ display:'inline-block', width:18, height:18, border:'2.5px solid rgba(0,0,0,.2)', borderTopColor:'#000', borderRadius:'50%' }}/> جاري الدخول...</>
                    : '🔐 تسجيل الدخول'}
                </button>
              </form>

              <div style={{ height:1, background:'var(--border)', margin:'22px 0' }} />

              <button onClick={() => { setCurrentPage('public-lessons'); setStudentResult(null); setStudentCode(''); setResultError(''); }} className="btn btn-violet btn-xl anim-pulse" style={{ width:'100%', gap:10 }}>
                <span style={{ fontSize:22 }}>🎓</span>
                <span style={{ fontSize:13, fontWeight:500 }}> طلاب مدرسة تين اويه انسوك </span>
                <span style={{ fontSize:22 }}>⭐</span>
              </button>
              <p style={{ textAlign:'center', color:'var(--muted)', fontSize:11, marginTop:8 }}>الحصص والدرجات — للطلاب فقط 🚀</p>

              <div style={{ marginTop:22, textAlign:'center' }}>
                <p style={{ fontSize:12, color:'var(--muted)', fontStyle:'italic', lineHeight:1.8 }}>
                  "لِيَكُنْ كُلُّ وَاحِدٍ بِحَسَبِ مَا أَخَذَ مَوْهِبَةً، يَخْدِمُ بِهَا بَعْضُكُمْ بَعْضًا"
                </p>
                <p style={{ fontSize:11, color:'var(--muted)', opacity:.4, marginTop:3 }}>(1 بط 4: 10)</p>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  /* ══════════════════════════════════════════════
     PUBLIC STUDENT CHECK
  ══════════════════════════════════════════════ */
  if (!isLoggedIn && currentPage === 'student-check') {
    const tempName = sessionStorage.getItem('tempStudentName');
    return (
      <>
        <GlobalStyles />
        <style>{`
          @keyframes floatY    { 0%,100%{transform:translateY(0);}  50%{transform:translateY(-10px);} }
          @keyframes orbit     { from{transform:rotate(0deg) translateX(52px) rotate(0deg);}
                                 to  {transform:rotate(360deg) translateX(52px) rotate(-360deg);} }
          @keyframes orbit2    { from{transform:rotate(180deg) translateX(40px) rotate(-180deg);}
                                 to  {transform:rotate(540deg) translateX(40px) rotate(-540deg);} }
          @keyframes ringRotate{ from{transform:rotate(0deg);} to{transform:rotate(360deg);} }
          @keyframes ringRev   { from{transform:rotate(0deg);} to{transform:rotate(-360deg);} }
          @keyframes poof      { 0%{opacity:0;transform:scale(.3);} 60%{opacity:1;transform:scale(1.1);} 100%{opacity:1;transform:scale(1);} }
          @keyframes gShift    { 0%,100%{background-position:0% 50%;} 50%{background-position:100% 50%;} }
          @keyframes barFill   { from{width:0%;} to{width:var(--bar-w);} }
          @keyframes counterUp { from{opacity:0;transform:translateY(16px);} to{opacity:1;transform:none;} }
          @keyframes borderGlow{ 0%,100%{border-color:rgba(139,92,246,.3);} 50%{border-color:rgba(139,92,246,.9);box-shadow:0 0 20px rgba(139,92,246,.3);} }
          @keyframes starPop   { 0%{opacity:0;transform:scale(0) rotate(-30deg);} 70%{transform:scale(1.2) rotate(5deg);} 100%{opacity:1;transform:scale(1) rotate(0);} }
          @keyframes slideUp   { from{opacity:0;transform:translateY(22px);} to{opacity:1;transform:none;} }
          @keyframes tapRipple { 0%{box-shadow:0 0 0 0 rgba(99,102,241,.6);} 70%{box-shadow:0 0 0 16px rgba(99,102,241,0);} 100%{box-shadow:0 0 0 0 rgba(99,102,241,0);} }

          .sp-float   { animation: floatY 3s ease-in-out infinite; }
          .sp-poof    { animation: poof .6s cubic-bezier(.34,1.56,.64,1) both; }
          .sp-slide   { animation: slideUp .45s cubic-bezier(.16,1,.3,1) both; }
          .sp-star    { animation: starPop .55s cubic-bezier(.34,1.56,.64,1) both; }
          .sp-counter { animation: counterUp .5s cubic-bezier(.16,1,.3,1) both; }
          .sp-ripple  { animation: tapRipple 1.8s ease-out infinite; }

          .sp-grad-text {
            background: linear-gradient(135deg,#b8860b 0%,#d946a8 40%,#6d28d9 80%,#0d9488 100%);
            background-size:300% 300%;
            -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text;
            animation: gShift 4s ease infinite;
          }
          [data-theme="dark"] .sp-grad-text {
            background: linear-gradient(135deg,#f5c842 0%,#f472b6 40%,#818cf8 80%,#2dd4bf 100%);
            background-size:300% 300%;
            -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text;
          }
          [data-theme="light"] .sp-grad-text {
            background: linear-gradient(135deg,#7c3aed 0%,#a855f7 40%,#6d28d9 80%,#0d9488 100%);
            background-size:300% 300%;
            -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text;
          }
          .sp-code-inp {
            width:100%; padding:15px 18px;
            font-family:'Courier New',monospace; font-size:20px; font-weight:900;
            text-align:center; letter-spacing:6px; text-transform:uppercase;
            background:var(--inp-bg); border:2px solid rgba(99,102,241,.3);
            border-radius:15px; color:var(--text); outline:none;
            transition:all .25s; animation: borderGlow 2.5s ease-in-out infinite;
          }
          .sp-code-inp:focus {
            border-color:#818cf8; background:rgba(99,102,241,.08);
            box-shadow:0 0 0 4px rgba(99,102,241,.12); animation:none;
          }
          .sp-code-inp::placeholder { color:var(--muted); font-size:14px; letter-spacing:2px; }
          .sp-method-card {
            border-radius:20px; border:1.5px solid var(--border);
            background:var(--bg-card); backdrop-filter:blur(20px);
            transition:all .25s cubic-bezier(.16,1,.3,1);
            overflow:hidden; padding:20px 18px;
          }
          .sp-method-card:hover { border-color:rgba(139,92,246,.45); box-shadow:0 10px 36px rgba(139,92,246,.1); }
          .sp-total-card {
            border-radius:24px; padding:30px 20px; text-align:center; margin:16px 0;
            background:linear-gradient(135deg,var(--gold-glow),rgba(245,158,11,.06),rgba(139,92,246,.08));
            border:2px solid var(--border-g);
            position:relative; overflow:hidden;
          }
          .sp-big-num { font-size:72px; font-weight:900; line-height:1; font-family:'Cairo',sans-serif; }
          @media(max-width:400px){ .sp-big-num{ font-size:56px; } }
          .sp-score-row {
            border-radius:16px; padding:14px 16px; margin-bottom:10px;
            transition:transform .2s; animation: slideUp .4s cubic-bezier(.16,1,.3,1) both;
          }
          .sp-score-row:hover { transform:translateX(-3px); }
        `}</style>
        <BgDeco isDark={isDark} />

        {/* Floating particles */}
        <div style={{ position:'fixed', inset:0, zIndex:0, pointerEvents:'none', overflow:'hidden' }}>
          {[...Array(14)].map((_,i)=>(
            <div key={i} style={{
              position:'absolute', borderRadius:'50%',
              width:`${3+i%4}px`, height:`${3+i%4}px`,
              background:[isDark?'#f5c842':'#b8860b',isDark?'#8b5cf6':'#6d28d9',isDark?'#2dd4bf':'#0d9488','#d946a8'][i%4],
              opacity:0.10+i%3*.04,
              top:`${7+i*6.5}%`, left:`${5+i*7}%`,
              animation:`floatY ${2.5+i*.4}s ${i*.2}s ease-in-out infinite`
            }}/>
          ))}
        </div>

        <div style={{ minHeight:'100vh', position:'relative', zIndex:1, padding:'0 0 48px' }} dir="rtl">
          <div style={{ maxWidth:540, margin:'0 auto', padding:'0 16px' }}>

            {/* Top bar */}
            <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'18px 0 20px' }}>
              <button onClick={() => { setCurrentPage('dashboard'); sessionStorage.removeItem('tempStudentName'); setResultError(''); setStudentResult(null); setScannedCode(''); setStudentCode(''); }}
                style={{ display:'flex', alignItems:'center', gap:7, background:'var(--bg-card)', border:'1px solid var(--border)', borderRadius:12, padding:'8px 14px', color:'var(--muted)', cursor:'pointer', fontSize:13, fontWeight:700, fontFamily:'Cairo,sans-serif', transition:'all .2s' }}>
                ← رجوع
              </button>
              <div style={{ display:'flex', alignItems:'center', gap:6, background:'var(--gold-glow)', border:'1px solid var(--border-g)', borderRadius:99, padding:'5px 13px' }}>
                  <span style={{ width:7, height:7, borderRadius:'50%', background:'var(--green)', boxShadow:'0 0 6px var(--green)', display:'inline-block' }}/>
                  <span style={{ fontSize:12, color:'var(--gold)', fontWeight:700 }}>مدرسة الألحان</span>
                </div>
            </div>

            {/* Hero */}
            {!studentResult && !showConfirmSearch && (
              <div style={{ textAlign:'center', marginBottom:30, padding:'4px 0' }}>
                <div style={{ position:'relative', width:120, height:120, margin:'0 auto 22px' }}>
                  <div style={{ position:'absolute', inset:-12, border:'1.5px dashed var(--border-g)', borderRadius:'50%', animation:'ringRotate 18s linear infinite' }}/>
                  <div style={{ position:'absolute', inset:-4, border:'1.5px solid rgba(139,92,246,.2)', borderRadius:'50%', animation:'ringRev 12s linear infinite' }}/>
                  <div style={{ width:'100%', height:'100%', borderRadius:'50%',
                    background:`linear-gradient(135deg,rgba(99,102,241,.15),var(--gold-glow))`,
                    border:'2px solid var(--border-g)',
                    boxShadow:`0 0 40px var(--gold-glow)`,
                    display:'flex', alignItems:'center', justifyContent:'center', backdropFilter:'blur(12px)' }}>
                    <span className="sp-float" style={{ fontSize:50 }}>🎓</span>
                  </div>
                </div>
                <h1 className="sp-grad-text" style={{ fontSize:28, fontWeight:900, marginBottom:8, lineHeight:1.3 }}>
                  اعرف نتيجتك دلوقتي! 🚀
                </h1>
                <p style={{ color:'var(--muted)', fontSize:14 }}>ادخل كودك أو Scan الـ QR Code</p>
              </div>
            )}

            {/* Search methods */}
            {!showConfirmSearch && !studentResult && (
              <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
                {/* QR Method */}
                <div className="sp-method-card sp-slide" style={{
                  animationDelay:'.0s',
                  border: showScanner ? '2px solid rgba(13,148,136,.5)' : `1.5px solid var(--border)`,
                  background: showScanner ? 'rgba(13,148,136,.05)' : 'var(--bg-card)',
                }}>
                  <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom: showScanner ? 16 : 0 }}>
                    <div style={{ position:'relative', flexShrink:0 }}>
                      <div style={{ width:50, height:50, borderRadius:16, background:'linear-gradient(135deg,#0d9488,#2dd4bf)', display:'flex', alignItems:'center', justifyContent:'center', boxShadow:'0 6px 24px rgba(13,148,136,.35)' }}>
                        <QrCode size={22} color="#fff"/>
                      </div>
                    </div>
                    <div style={{ flex:1 }}>
                      <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:2 }}>
                        <h2 style={{ fontWeight:900, fontSize:16, color:'var(--text)' }}>📷 Scan QR Code</h2>
                        <div style={{ background:'rgba(13,148,136,.1)', border:'1px solid rgba(13,148,136,.3)', borderRadius:7, padding:'2px 9px' }}>
                          <span style={{ fontSize:10, color:'var(--teal)', fontWeight:700 }}>⭐ الأسرع</span>
                        </div>
                      </div>
                      <p style={{ color:'var(--muted)', fontSize:12 }}>صوّر الـ QR Code بتاعك في ثانية</p>
                    </div>
                    {!showScanner && (
                      <button onClick={startScanner}
                        style={{ flexShrink:0, padding:'11px 20px', borderRadius:13, border:'none', cursor:'pointer', background:'linear-gradient(135deg,#0d9488,#2dd4bf)', color:'#fff', fontFamily:'Cairo,sans-serif', fontWeight:900, fontSize:14, display:'flex', alignItems:'center', gap:8, boxShadow:'0 5px 22px rgba(13,148,136,.3)', transition:'all .25s' }}>
                        <Camera size={17}/> ابدأ
                      </button>
                    )}
                  </div>
                  {showScanner && (
                    <div>
                      <div style={{ background:'rgba(13,148,136,.06)', border:'1px solid rgba(13,148,136,.2)', borderRadius:12, padding:'10px 14px', marginBottom:12, display:'flex', alignItems:'center', gap:10 }}>
                        <div style={{ width:10, height:10, borderRadius:'50%', background:'var(--teal)', animation:'tapRipple 1.2s ease-out infinite', flexShrink:0 }}/>
                        <p style={{ color:'var(--teal)', fontWeight:700, fontSize:13 }}>🎯 وجّه الكاميرا على الـ QR Code</p>
                      </div>
                      <div style={{ position:'relative', marginBottom:12 }}>
                        <div id="qr-reader-public" style={{ borderRadius:18, overflow:'hidden', border:'3px solid var(--teal)', boxShadow:`0 8px 30px rgba(0,0,0,.2)` }}/>
                      </div>
                      <button onClick={stopScanner}
                        style={{ width:'100%', padding:'12px', borderRadius:13, border:'1px solid rgba(244,63,94,.3)', background:'rgba(244,63,94,.08)', color:'var(--rose)', fontFamily:'Cairo,sans-serif', fontWeight:700, fontSize:13, cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', gap:7 }}>
                        <XCircle size={16}/> إلغاء الـ Scan
                      </button>
                    </div>
                  )}
                  {scannerError && <p style={{ marginTop:10, color:'var(--rose)', fontWeight:700, fontSize:12, textAlign:'center' }}>{scannerError}</p>}
                </div>

                {/* Divider */}
                <div style={{ display:'flex', alignItems:'center', gap:14 }}>
                  <div style={{ flex:1, height:1, background:`linear-gradient(90deg,transparent,var(--border),transparent)` }}/>
                  <div style={{ background:'var(--bg-card)', border:'1px solid var(--border)', borderRadius:99, padding:'4px 16px' }}>
                    <span style={{ color:'var(--violet)', fontWeight:900, fontSize:13 }}>أو</span>
                  </div>
                  <div style={{ flex:1, height:1, background:`linear-gradient(90deg,transparent,var(--border),transparent)` }}/>
                </div>

                {/* Code Method */}
                <div className="sp-method-card sp-slide" style={{ animationDelay:'.1s' }}>
                  <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:16 }}>
                    <div style={{ width:50, height:50, borderRadius:16, background:'linear-gradient(135deg,#4f46e5,#7c3aed)', display:'flex', alignItems:'center', justifyContent:'center', boxShadow:'0 6px 24px rgba(79,70,229,.3)', flexShrink:0 }}>
                      <Key size={22} color="#fff"/>
                    </div>
                    <div>
                      <h2 style={{ fontWeight:900, fontSize:16, marginBottom:1, color:'var(--text)' }}>⌨️ أدخل الكود</h2>
                      <p style={{ color:'var(--muted)', fontSize:12 }}>الكود الخاص بيك من المدرسة</p>
                    </div>
                  </div>
                  <input className="sp-code-inp" type="text" placeholder="TEN-XXXXXX" value={studentCode}
                    onChange={e=>{ setStudentCode(e.target.value.toUpperCase()); setResultError(''); }}
                    onKeyPress={e=>{ if(e.key==='Enter'&&studentCode.trim()){ setIsSearching(true); searchStudentByCodePublic().finally(()=>setIsSearching(false)); }}}
                  />
                  <button
                    style={{ width:'100%', marginTop:12, padding:'14px', borderRadius:15, border:'none', cursor:(!studentCode.trim()||isSearching)?'not-allowed':'pointer',
                      background:(!studentCode.trim()||isSearching)?'var(--inp-bg)':'linear-gradient(135deg,#4f46e5,#7c3aed)',
                      color:(!studentCode.trim()||isSearching)?'var(--muted)':'#fff',
                      fontFamily:'Cairo,sans-serif', fontWeight:900, fontSize:15,
                      display:'flex', alignItems:'center', justifyContent:'center', gap:10,
                      boxShadow:(!studentCode.trim()||isSearching)?'none':'0 6px 28px rgba(79,70,229,.35)',
                      transition:'all .25s' }}
                    onClick={async()=>{ setIsSearching(true); try{await searchStudentByCodePublic();}finally{setIsSearching(false);} }}
                    disabled={!studentCode.trim()||isSearching}>
                    {isSearching
                      ? <><span style={{ width:18,height:18,border:'2.5px solid rgba(255,255,255,.3)',borderTopColor:'#fff',borderRadius:'50%',animation:'spin .85s linear infinite',display:'inline-block' }}/> جاري البحث...</>
                      : <><Search size={18}/> دوّر على درجاتي! 🎯</>}
                  </button>
                  {resultError && (
                    <div style={{ marginTop:14, background:'rgba(244,63,94,.06)', border:'1px solid rgba(244,63,94,.22)', borderRadius:13, padding:'16px', textAlign:'center' }}>
                      <div style={{ fontSize:32, marginBottom:6 }}>😬</div>
                      <p style={{ color:'var(--rose)', fontWeight:700, fontSize:13, marginBottom:10 }}>{resultError}</p>
                      <button onClick={()=>{ setResultError(''); setStudentCode(''); setScannedCode(''); }}
                        style={{ padding:'7px 18px', borderRadius:9, border:'1px solid rgba(244,63,94,.3)', background:'rgba(244,63,94,.08)', color:'var(--rose)', fontFamily:'Cairo,sans-serif', fontWeight:700, fontSize:12, cursor:'pointer' }}>
                        حاول تاني 🔄
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Confirm */}
            {showConfirmSearch && tempName && (
              <div style={{ textAlign:'center', animation:'slideUp .4s cubic-bezier(.16,1,.3,1) both' }}>
                <div style={{ fontSize:64, marginBottom:12, animation:'poof .6s cubic-bezier(.34,1.56,.64,1) both' }}>🤔</div>
                <h2 style={{ fontSize:24, fontWeight:900, marginBottom:18, color:'var(--text)' }}>هل أنت...؟</h2>
                <div style={{ background:`linear-gradient(135deg,var(--gold-glow),rgba(99,102,241,.08))`, border:'2px solid var(--border-g)', borderRadius:22, padding:'24px 20px', marginBottom:24 }}>
                  <p style={{ fontSize:30, fontWeight:900, color:'var(--gold)' }}>{tempName}</p>
                </div>
                <div style={{ display:'flex', gap:12 }}>
                  <button onClick={async()=>{ setShowConfirmSearch(false); setIsSearching(true); try{setStudentCode(scannedCode); await searchStudentByCodePublic();}finally{setIsSearching(false);} }} disabled={isSearching}
                    style={{ flex:1, padding:'15px', borderRadius:16, border:'none', cursor:'pointer', background:'linear-gradient(135deg,#10b981,#059669)', color:'#fff', fontFamily:'Cairo,sans-serif', fontWeight:900, fontSize:16, boxShadow:'0 6px 24px rgba(16,185,129,.3)', display:'flex', alignItems:'center', justifyContent:'center', gap:8 }}>
                    {isSearching ? <span style={{ width:20,height:20,border:'2.5px solid rgba(255,255,255,.3)',borderTopColor:'#fff',borderRadius:'50%',animation:'spin .85s linear infinite',display:'inline-block' }}/> : <><Check size={22}/> أيوه أنا! 😄</>}
                  </button>
                  <button onClick={()=>{ setShowConfirmSearch(false); setScannedCode(''); setStudentCode(''); setResultError(''); sessionStorage.removeItem('tempStudentName'); }}
                    style={{ flex:1, padding:'15px', borderRadius:16, border:'none', cursor:'pointer', background:'linear-gradient(135deg,#f43f5e,#be123c)', color:'#fff', fontFamily:'Cairo,sans-serif', fontWeight:900, fontSize:16, display:'flex', alignItems:'center', justifyContent:'center', gap:8 }}>
                    <XCircle size={22}/> لأ 🙅
                  </button>
                </div>
              </div>
            )}

            {/* Loading overlay */}
            {isSearching && (
              <div style={{ position:'fixed', inset:0, background:isDark?'rgba(0,0,0,.78)':'rgba(240,242,248,.85)', backdropFilter:'blur(14px)', zIndex:60, display:'flex', alignItems:'center', justifyContent:'center' }}>
                <div style={{ textAlign:'center' }}>
                  <div style={{ position:'relative', width:100, height:100, margin:'0 auto 24px' }}>
                    <div style={{ position:'absolute', inset:0, border:'3px solid var(--border)', borderRadius:'50%' }}/>
                    <div style={{ position:'absolute', inset:0, border:'3px solid transparent', borderTopColor:'var(--violet)', borderRadius:'50%', animation:'spin .85s linear infinite' }}/>
                    <div style={{ position:'absolute', inset:0, display:'flex', alignItems:'center', justifyContent:'center' }}>
                      <span style={{ fontSize:36, animation:'floatY 2s ease-in-out infinite' }}>🔍</span>
                    </div>
                  </div>
                  <h2 style={{ fontSize:22, fontWeight:900, marginBottom:6, color:'var(--text)' }}>بندور على درجاتك</h2>
                  <p style={{ color:'var(--muted)', fontSize:14 }}>ثانية يا صديقي... ✨</p>
                  <div style={{ display:'flex', justifyContent:'center', marginTop:16 }}><span className="dot"/><span className="dot"/><span className="dot"/></div>
                </div>
              </div>
            )}

            {/* Result */}
            {studentResult && (
              <div style={{ animation:'slideUp .5s cubic-bezier(.16,1,.3,1) both' }}>
                {/* Student banner */}
                <div style={{ borderRadius:24, overflow:'hidden', marginBottom:14, padding:'28px 20px', textAlign:'center', position:'relative',
                  background:`linear-gradient(135deg,rgba(99,102,241,.12) 0%,var(--gold-glow) 50%,rgba(13,148,136,.1) 100%)`,
                  border:'1px solid var(--border-g)' }}>
                  <div style={{ fontSize:52, marginBottom:10, animation:'poof .6s cubic-bezier(.34,1.56,.64,1) both' }}>🎉</div>
                  <h2 style={{ fontSize:22, fontWeight:900, marginBottom:4, color:'var(--text)' }}>
                    عامل ايه يا <span style={{ color:'var(--gold)' }}>{studentResult.name}</span>!
                  </h2>
                  <p style={{ color:'var(--muted)', fontSize:13 }}>سنة {studentResult.age||'-'}</p>
                </div>

                {/* Attendance row */}
                <div className="sp-score-row" style={{ background:'rgba(13,148,136,.06)', border:'1px solid rgba(13,148,136,.15)', animationDelay:'.0s' }}>
                  <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:8 }}>
                    <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                      <span style={{ fontSize:22 }}>📅</span>
                      <div>
                        <p style={{ fontWeight:900, fontSize:14, color:'var(--text)' }}>الحضور</p>
                        <p style={{ color:'var(--muted)', fontSize:11 }}>حضرت {studentResult.attendedCount} من {studentResult.totalSessions} حصة</p>
                      </div>
                    </div>
                    <div>
                      <span style={{ fontSize:24, fontWeight:900, color:'var(--teal)' }}>{studentResult.attendance}</span>
                      <span style={{ fontSize:12, color:'var(--muted)' }}>/30</span>
                    </div>
                  </div>
                  <div style={{ height:6, background:'var(--border)', borderRadius:99, overflow:'hidden' }}>
                    <div style={{ height:'100%', borderRadius:99, background:'linear-gradient(90deg,var(--teal),#2dd4bf)', width:`${Math.min(100,parseFloat(studentResult.attendance)/30*100)}%`, transition:'width 1.2s cubic-bezier(.16,1,.3,1)' }}/>
                  </div>
                </div>

                {/* Exam rows */}
                {[
                  { label:'امتحان الشهر', icon:'📝', data:studentResult.monthly, max:30, color:'#3b82f6', bg:'rgba(59,130,246,.06)', border:'rgba(59,130,246,.15)', d:'.08s',
                    subs:[{l:'قبطي',k:'coptic',m:10},{l:'طقس',k:'liturgy',m:10},{l:'تسميع',k:'oral',m:10}] },
                  { label:'الامتحان النهائي', icon:'🏆', data:studentResult.final, max:50, color:'var(--rose)', bg:'rgba(244,63,94,.06)', border:'rgba(244,63,94,.15)', d:'.16s',
                    subs:[{l:'قبطي',k:'coptic',m:15},{l:'طقس',k:'liturgy',m:15},{l:'تسميع',k:'oral',m:20}] },
                ].map((exam, ei) => {
                  const data = exam.data || {};
                  const baseScore = (data.coptic||0)+(data.liturgy||0)+(data.oral||0);
                  const bonus = parseFloat(data.bonus||0);
                  const total = baseScore + bonus;
                  const pct = Math.min(100, total / exam.max * 100);
                  const hasBonus = bonus > 0;
                  return (
                    <div key={ei} className="sp-score-row" style={{ background:exam.bg, border:`1px solid ${exam.border}`, animationDelay:exam.d }}>
                      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:10 }}>
                        <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                          <span style={{ fontSize:20 }}>{exam.icon}</span>
                          <p style={{ fontWeight:900, fontSize:14, color:'var(--text)' }}>{exam.label}</p>
                        </div>
                        <div style={{ display:'flex', alignItems:'baseline', gap:3 }}>
                          {hasBonus && <span style={{ fontSize:11, fontWeight:900, color:'#f59e0b', background:'rgba(245,158,11,.12)', border:'1px solid rgba(245,158,11,.25)', borderRadius:6, padding:'2px 7px', marginLeft:4 }}>+{bonus.toFixed(1)} 🎁</span>}
                          <span style={{ fontSize:26, fontWeight:900, color:exam.color }}>{total.toFixed(1)}</span>
                          <span style={{ fontSize:12, color:'var(--muted)' }}>/{exam.max}</span>
                        </div>
                      </div>
                      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:7, marginBottom:8 }}>
                        {[
                          ...( exam.subs||[]).map(sub => ({ label:sub.l, val:parseFloat(data[sub.k]||0), max:sub.m })),
                        ].map((sub,si)=>(
                          <div key={si} style={{ background:'var(--inp-bg)', borderRadius:10, padding:'9px 11px', border:'1px solid var(--border)' }}>
                            <p style={{ color:'var(--muted)', fontSize:10, fontWeight:700, marginBottom:3 }}>{sub.label}</p>
                            <div style={{ display:'flex', alignItems:'baseline', gap:3 }}>
                              <span style={{ fontSize:20, fontWeight:900, color:exam.color }}>{sub.val.toFixed(1)}</span>
                              <span style={{ fontSize:10, color:'var(--muted)' }}>/{sub.max}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div style={{ height:5, background:'var(--border)', borderRadius:99, overflow:'hidden' }}>
                        <div style={{ height:'100%', borderRadius:99, background:exam.color, width:`${pct}%`, transition:`width 1s .3s cubic-bezier(.16,1,.3,1)` }}/>
                      </div>
                    </div>
                  );
                })}

                {/* Total */}
                <div className="sp-total-card">
                  <p style={{ color:'var(--muted)', fontSize:13, marginBottom:8 }}>✨ المجموع الكلي ✨</p>
                  <div className="sp-big-num sp-counter" style={{ color:'var(--gold)', marginBottom:4 }}>
                    {studentResult.total}
                  </div>
                  <p style={{ color:'var(--muted)', fontSize:14, marginBottom:14 }}>من 100 درجة</p>
                  <div style={{ display:'inline-flex', alignItems:'center', gap:8, background:'var(--inp-bg)', borderRadius:99, padding:'9px 24px', border:`1.5px solid ${studentResult.grade.color}33` }}>
                    <span style={{ fontSize:22 }}>
                      {parseFloat(studentResult.total)>=85?'🥇':parseFloat(studentResult.total)>=75?'🥈':parseFloat(studentResult.total)>=65?'🥉':parseFloat(studentResult.total)>=50?'✅':'⏳'}
                    </span>
                    <span style={{ fontSize:22, fontWeight:900, color:studentResult.grade.color }}>{studentResult.grade.text}</span>
                  </div>
                </div>

                <button onClick={()=>{ setStudentCode(''); setStudentResult(null); setScannedCode(''); setShowConfirmSearch(false); setResultError(''); sessionStorage.removeItem('tempStudentName'); }}
                  style={{ width:'100%', marginBottom:10, padding:'14px', borderRadius:15, border:'none', cursor:'pointer', background:'linear-gradient(135deg,#4f46e5,#7c3aed)', color:'#fff', fontFamily:'Cairo,sans-serif', fontWeight:900, fontSize:15, display:'flex', alignItems:'center', justifyContent:'center', gap:10, boxShadow:'0 6px 28px rgba(79,70,229,.3)' }}>
                  <Search size={18}/> ابحث عن طالب آخر 🔍
                </button>
                <button onClick={()=>{ setCurrentPage('dashboard'); setStudentResult(null); setStudentCode(''); }}
                  style={{ width:'100%', padding:'11px', borderRadius:15, border:'1px solid var(--border)', background:'var(--inp-bg)', color:'var(--muted)', fontFamily:'Cairo,sans-serif', fontWeight:700, fontSize:13, cursor:'pointer' }}>
                  ← رجوع
                </button>
              </div>
            )}
          </div>
        </div>
      </>
    );
  }

  /* ══════════════════════════════════════════════
     PUBLIC STUDENT PAGE — حصص + درجات في صفحة واحدة
  ══════════════════════════════════════════════ */
  if (!isLoggedIn && currentPage === 'public-lessons') {
    const publishedChants = chants.filter(c => c.is_published !== false);
    if (chants.length === 0) {
      supabase.from('chants').select('*').eq('is_published', true).order('order_num').order('name')
        .then(({ data }) => setChants(data || []));
    }
    return (
      <>
        <GlobalStyles />
        <BgDeco isDark={isDark} />
        <div style={{ minHeight:'100vh', position:'relative', zIndex:1, paddingBottom:60 }} dir="rtl">
          <div style={{ maxWidth:640, margin:'0 auto', padding:'0 16px' }}>

            {/* Top bar */}
            <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'16px 0 18px' }}>
              <button onClick={() => { setCurrentPage('dashboard'); setShowPublicGrades(false); setPublicStudentResult(null); setPublicStudentCode(''); }}
                style={{ display:'flex', alignItems:'center', gap:6, background:'var(--bg-card)', border:'1px solid var(--border)', borderRadius:12, padding:'7px 14px', color:'var(--muted)', cursor:'pointer', fontSize:13, fontWeight:700, fontFamily:'Cairo,sans-serif' }}>
                ← رجوع
              </button>
              <div style={{ display:'flex', alignItems:'center', gap:6, background:'var(--gold-glow)', border:'1px solid var(--border-g)', borderRadius:99, padding:'5px 13px' }}>
                <span style={{ width:7, height:7, borderRadius:'50%', background:'var(--green)', boxShadow:'0 0 6px var(--green)', display:'inline-block' }}/>
                <span style={{ fontSize:12, color:'var(--gold)', fontWeight:700 }}>مدرسة الألحان</span>
              </div>
            </div>

            {/* TAB TOGGLE */}
            <div style={{ display:'flex', background:'var(--bg-card)', border:'1px solid var(--border)', borderRadius:16, padding:5, marginBottom:22, gap:5 }}>
              <button onClick={() => setShowPublicGrades(false)}
                style={{ flex:1, padding:'11px', borderRadius:12, border:'none', cursor:'pointer', fontFamily:'Cairo,sans-serif', fontWeight:800, fontSize:14, transition:'all .25s',
                  background: !showPublicGrades ? 'linear-gradient(135deg,var(--violet),#6d28d9)' : 'transparent',
                  color: !showPublicGrades ? '#fff' : 'var(--muted)' }}>
                🎵 الألحان
              </button>
              <button onClick={() => setShowPublicGrades(true)}
                style={{ flex:1, padding:'11px', borderRadius:12, border:'none', cursor:'pointer', fontFamily:'Cairo,sans-serif', fontWeight:800, fontSize:14, transition:'all .25s',
                  background: showPublicGrades ? 'linear-gradient(135deg,var(--gold),#b8860b)' : 'transparent',
                  color: showPublicGrades ? '#000' : 'var(--muted)' }}>
                🎓 درجاتك
              </button>
            </div>

            {/* TAB 1: الألحان */}
            {!showPublicGrades && (
              <div>
                <div style={{ textAlign:'center', marginBottom:18 }}>
                  <h1 style={{ fontSize:22, fontWeight:900, color:'var(--gold)', marginBottom:6 }}>🎵 ألحان </h1>
                  <p style={{ color:'var(--muted)', fontSize:13 }}>اضغط على اللحن عشان تسمعه</p>
                </div>

                {publishedChants.length > 0 && (
                  <div style={{ position:'relative', marginBottom:16 }}>
                    <Search size={15} style={{ position:'absolute', right:14, top:'50%', transform:'translateY(-50%)', color:'var(--muted)', pointerEvents:'none' }}/>
                    <input type="text" placeholder="ابحث باسم اللحن..." value={chantSearch}
                      onChange={e => setChantSearch(e.target.value)}
                      style={{ width:'100%', padding:'11px 40px 11px 14px', background:'var(--inp-bg)', border:'1.5px solid var(--border)', borderRadius:13, color:'var(--text)', fontFamily:'Cairo,sans-serif', fontSize:14, outline:'none', boxSizing:'border-box' }}/>
                  </div>
                )}

                {publishedChants.length === 0 ? (
                  <div style={{ textAlign:'center', padding:'50px 0' }}>
                    <div style={{ fontSize:48, marginBottom:12 }}>📭</div>
                    <p style={{ fontSize:16, fontWeight:700, color:'var(--muted)' }}>لسه مفيش ألحان متاحة</p>
                  </div>
                ) : (() => {
                  const filtered = publishedChants.filter(c =>
                    !chantSearch.trim() || c.name.toLowerCase().includes(chantSearch.toLowerCase())
                  );
                  return filtered.length === 0 ? (
                    <div style={{ textAlign:'center', padding:'30px 0' }}>
                      <div style={{ fontSize:36, marginBottom:10 }}>🔍</div>
  
