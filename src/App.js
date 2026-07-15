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
  const attendanceSyncingRef = useRef(new Set()); // منع الدوسات المتكررة على نفس الطالب/الحصة قبل ما الطلب يخلص
  const pendingChangesRef = useRef([]); // نسخة دايمًا محدّثة من pendingChanges عشان الـ 'online' listener (بيتسجل مرة واحدة بس) يشوف أحدث قيمة

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

  useEffect(() => { pendingChangesRef.current = pendingChanges; }, [pendingChanges]);

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

  // ── Secure public result fetch (uses RPC — DB only returns THIS student's data) ──
  // Replaces the old direct table reads that exposed every student's data to anyone.
  const fetchPublicStudentResultByCode = async (code) => {
    const { data, error } = await supabase.rpc('get_student_public_result', { p_code: code.trim().toUpperCase() });
    const row = Array.isArray(data) ? data[0] : data;
    if (error || !row) return null;
    const mRaw = (row.m_coptic||0)+(row.m_liturgy||0)+(row.m_oral||0);
    const fRaw = (row.f_coptic||0)+(row.f_liturgy||0)+(row.f_oral||0);
    const mBonus = row.m_bonus||0; const fBonus = row.f_bonus||0;
    const attScore = parseFloat(row.attendance_score||0);
    const base = ((attScore + mRaw + fRaw) / 110 * 100);
    const tot = (base + mBonus + fBonus).toFixed(2);
    return {
      name: row.student_name, age: row.student_age,
      attendance: attScore.toFixed(2), attendedCount: row.attended_count, totalSessions: row.total_sessions,
      monthly: { coptic:row.m_coptic||0, liturgy:row.m_liturgy||0, oral:row.m_oral||0, bonus:mBonus, total:mRaw.toFixed(1) },
      final:   { coptic:row.f_coptic||0, liturgy:row.f_liturgy||0, oral:row.f_oral||0, bonus:fBonus, total:fRaw.toFixed(1) },
      total: tot, grade: getGrade(parseFloat(tot))
    };
  };

  // ── Public student search (for chants page) ──
  const searchPublicStudent = async () => {
    setPublicResultError('');
    setPublicStudentResult(null);
    if (!publicStudentCode.trim()) { setPublicResultError('أدخل الكود'); return; }
    setPublicSearching(true);
    try {
      const result = await fetchPublicStudentResultByCode(publicStudentCode);
      if (!result) { setPublicResultError('❌ الكود غير صحيح!'); return; }
      setPublicStudentResult(result);
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
    const key = `${studentId}-${sessionIndex}`;
    if (attendanceSyncingRef.current.has(key)) return; // في نداء شغال بالفعل لنفس الطالب/الحصة
    const current = attendance[studentId] || Array(12).fill(false);
    const newValue = !current[sessionIndex];
    setAttendance(prev => {
      const c = prev[studentId] || Array(12).fill(false);
      return { ...prev, [studentId]: c.map((v, i) => i === sessionIndex ? newValue : v) };
    });
    if (isOffline) {
      const change = { type:'attendance', studentId, sessionIndex, value: newValue, timestamp: Date.now() };
      const np = [...pendingChanges, change]; setPendingChanges(np);
      localStorage.setItem('pendingAttendance', JSON.stringify(np));
      toast('💾 تم الحفظ محلياً!', { icon: '✅' }); return;
    }
    attendanceSyncingRef.current.add(key);
    try {
      // نجيب أحدث نسخة من قاعدة البيانات قبل ما نكتب، عشان منمسحش تسجيل حضور حصل من جهاز تاني في نفس الوقت
      const { data: fresh } = await supabase.from('attendance').select('sessions').eq('student_id', studentId).maybeSingle();
      const freshSessions = fresh?.sessions || Array(12).fill(false);
      const merged = freshSessions.map((v, i) => i === sessionIndex ? newValue : v);
      const { error } = await supabase.from('attendance').upsert({ student_id: studentId, sessions: merged }, { onConflict: 'student_id' });
      if (error) throw error;
      setAttendance(prev => ({ ...prev, [studentId]: merged }));
    } catch { toast.error('خطأ في الحفظ!'); }
    finally { attendanceSyncingRef.current.delete(key); }
  };

  const syncPendingChanges = async () => {
    const current = pendingChangesRef.current;
    if (current.length === 0) return;
    toast.loading('جاري المزامنة...', { id: 'sync' });
    const fail = []; let cnt = 0;
    try {
      // نجمع كل التغييرات حسب الطالب، عشان نقرا ونكتب مرة واحدة بس لكل طالب بدل ما نكرر
      const byStudent = {};
      for (const ch of current) {
        if (ch.type !== 'attendance') continue;
        if (!byStudent[ch.studentId]) byStudent[ch.studentId] = [];
        byStudent[ch.studentId].push(ch);
      }
      for (const studentId of Object.keys(byStudent)) {
        const changes = byStudent[studentId];
        try {
          const { data: fresh, error: fe } = await supabase.from('attendance').select('sessions').eq('student_id', studentId).maybeSingle();
          if (fe) throw fe;
          let merged = fresh?.sessions || Array(12).fill(false);
          changes.forEach(ch => {
            if (ch.sessionIndex !== undefined) merged = merged.map((v, i) => i === ch.sessionIndex ? ch.value : v);
            else if (Array.isArray(ch.sessions)) merged = ch.sessions; // توافق مع تغييرات قديمة محفوظة قبل التحديث
          });
          const { error: ue } = await supabase.from('attendance').upsert({ student_id: studentId, sessions: merged }, { onConflict: 'student_id' });
          if (ue) throw ue;
          cnt += changes.length;
        } catch { changes.forEach(ch => { if (Date.now() - ch.timestamp < 7*24*60*60*1000) fail.push(ch); }); }
      }
      setPendingChanges(fail); pendingChangesRef.current = fail;
      if (fail.length > 0) { localStorage.setItem('pendingAttendance', JSON.stringify(fail)); toast.error(`مزامنة ${cnt}/${current.length}`, { id:'sync', duration:4000 }); }
      else { localStorage.removeItem('pendingAttendance'); toast.success(`تم المزامنة ✅ (${cnt})`, { id:'sync' }); }
      if (cnt > 0) await loadAttendance();
    } catch { toast.error('فشلت المزامنة!', { id:'sync' }); }
  };

  const toggleSessionLock = (i) => setLockedSessions(prev => prev.map((l, idx) => idx === i ? !l : l));

  const selectAllForSession = async (sessionIndex) => {
    if (lockedSessions[sessionIndex]) return;
    const tid = toast.loading('جاري تحديد الكل...');
    try {
      const results = await Promise.all(students.map(async (s) => {
        // نجيب أحدث نسخة قبل الكتابة عشان منمسحش تسجيل حصل من جهاز تاني
        const { data: fresh } = await supabase.from('attendance').select('sessions').eq('student_id', s.id).maybeSingle();
        const freshSessions = fresh?.sessions || Array(12).fill(false);
        const merged = freshSessions.map((v, i) => i === sessionIndex ? true : v);
        const { error } = await supabase.from('attendance').upsert({ student_id: s.id, sessions: merged }, { onConflict: 'student_id' });
        if (error) throw error;
        return { id: s.id, sessions: merged };
      }));
      setAttendance(prev => {
        const next = { ...prev };
        results.forEach(r => { next[r.id] = r.sessions; });
        return next;
      });
      toast.success('تم تحديد الكل! ✅', { id: tid });
    } catch { toast.error('حصل خطأ أثناء التحديد!', { id: tid }); }
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
      const result = await fetchPublicStudentResultByCode(studentCode);
      if (!result) { setResultError('❌ الكود غير صحيح!'); return; }
      setStudentResult(result);
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
        const { data:vData, error:se } = await supabase.rpc('verify_student_code', { p_code: decodedText.trim().toUpperCase() });
        const sd = Array.isArray(vData) ? vData[0] : vData;
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
      const { data:st, error:me } = await supabase.rpc('mark_attendance', { p_student_id: student.id, p_session_index: si });
      const status = Array.isArray(st) ? st[0] : st;
      if (me) throw new Error('فشل التحديث');
      if (status === 'already_registered') { setScannedStudentData({success:false,message:'⚠️ مسجل من قبل!',studentName:student.name,session:selectedSession,type:'already_registered'}); toast.error(`⚠️ ${student.name} - مسجل!`,{duration:2000}); sessionStorage.removeItem(LOCK); return {success:false}; }
      setAttendance(prev=>{ const c=prev[student.id]||Array(12).fill(false); return {...prev,[student.id]:c.map((v,i)=>i===si?true:v)}; });
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
                      <p style={{ color:'var(--muted)', fontWeight:700 }}>مفيش نتائج لـ "{chantSearch}"</p>
                    </div>
                  ) : (
                    <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
                      {filtered.map(chant => {
                        const isOpen = expandedChant === chant.id;
                        // Drive file ID → direct streamable URL
                        const m = chant.drive_url?.match(/\/d\/([a-zA-Z0-9_-]+)/);
                        const fileId = m ? m[1] : null;
                        const streamUrl = fileId ? `https://drive.google.com/uc?export=open&id=${fileId}` : chant.drive_url;
                        const downloadUrl = fileId ? `https://drive.google.com/uc?export=download&id=${fileId}` : chant.drive_url;
                        return (
                          <div key={chant.id} style={{ borderRadius:16, overflow:'hidden', border: isOpen ? '1.5px solid rgba(139,92,246,.5)' : '1.5px solid var(--border)', background:'var(--bg-card)', transition:'all .2s' }}>

                            {/* Header row */}
                            <button onClick={() => setExpandedChant(isOpen ? null : chant.id)}
                              style={{ width:'100%', display:'flex', alignItems:'center', gap:12, padding:'14px 16px', background:'none', border:'none', cursor:'pointer', fontFamily:'Cairo,sans-serif', textAlign:'right' }}>
                              <div style={{ width:44, height:44, borderRadius:13, flexShrink:0, display:'flex', alignItems:'center', justifyContent:'center',
                                background: isOpen ? 'linear-gradient(135deg,var(--violet),#7c3aed)' : 'linear-gradient(135deg,rgba(139,92,246,.12),var(--gold-glow))',
                                border: isOpen ? 'none' : '1px solid var(--border-g)', transition:'all .25s',
                                boxShadow: isOpen ? '0 4px 16px rgba(139,92,246,.35)' : 'none' }}>
                                <span style={{ fontSize:22 }}>{isOpen ? '🔊' : '🎵'}</span>
                              </div>
                              <div style={{ flex:1, minWidth:0, textAlign:'right' }}>
                                <p style={{ fontWeight:900, fontSize:15, color: isOpen ? 'var(--violet)' : 'var(--text)', transition:'color .2s' }}>{chant.name}</p>
                                {chant.notes && <p style={{ color:'var(--muted)', fontSize:11, marginTop:2 }}>{chant.notes}</p>}
                              </div>
                              <div style={{ color: isOpen ? 'var(--violet)' : 'var(--muted)', transition:'transform .3s', transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', flexShrink:0 }}>
                                <ChevronDown size={18}/>
                              </div>
                            </button>

                            {/* Player — lazy load */}
                            {isOpen && (
                              <div style={{ padding:'0 14px 16px', borderTop:'1px solid var(--border)' }}>
                                {/* Audio Player */}
                                <div style={{ marginTop:12, background:'var(--inp-bg)', border:'1px solid rgba(139,92,246,.25)', borderRadius:14, padding:'14px 16px' }}>
                                  <audio
                                    id={`aud-${chant.id}`}
                                    controls
                                    controlsList="nodownload"
                                    preload="metadata"
                                    style={{ width:'100%', display:'block', accentColor:'var(--violet)', borderRadius:8 }}
                                    src={chant.drive_url}>
                                    المتصفح مش بيدعم الصوت
                                  </audio>
                                  {/* Skip buttons */}
                                  <div style={{ display:'flex', justifyContent:'center', gap:12, marginTop:10 }}>
                                    <button
                                      onClick={() => { const a = document.getElementById(`aud-${chant.id}`); if(a) a.currentTime = Math.max(0, a.currentTime - 3); }}
                                      style={{ display:'flex', alignItems:'center', gap:5, padding:'7px 16px', borderRadius:99, border:'1px solid rgba(139,92,246,.25)', background:'rgba(139,92,246,.08)', color:'var(--violet)', cursor:'pointer', fontFamily:'Cairo,sans-serif', fontWeight:700, fontSize:13 }}>
                                      ⏩ <span></span>
                                    </button>
                                    <button
                                      onClick={() => { const a = document.getElementById(`aud-${chant.id}`); if(a) a.currentTime = Math.min(a.duration||0, a.currentTime + 3); }}
                                      style={{ display:'flex', alignItems:'center', gap:5, padding:'7px 16px', borderRadius:99, border:'1px solid rgba(139,92,246,.25)', background:'rgba(139,92,246,.08)', color:'var(--violet)', cursor:'pointer', fontFamily:'Cairo,sans-serif', fontWeight:700, fontSize:13 }}>
                                      <span></span> ⏪
                                    </button>
                                  </div>
                                </div>

                                {/* Download */}
                                <button
                                  onClick={async () => {
                                    try {
                                      const res = await fetch(chant.drive_url);
                                      const blob = await res.blob();
                                      const url = URL.createObjectURL(blob);
                                      const a = document.createElement('a');
                                      a.href = url;
                                      a.download = `${chant.name}.mp3`;
                                      a.click();
                                      URL.revokeObjectURL(url);
                                    } catch {
                                      window.open(chant.drive_url, '_blank');
                                    }
                                  }}
                                  style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:8, marginTop:10, padding:'10px', borderRadius:11, background:'rgba(139,92,246,.08)', border:'1px solid rgba(139,92,246,.2)', color:'var(--violet)', fontFamily:'Cairo,sans-serif', fontWeight:700, fontSize:13, cursor:'pointer', width:'100%' }}>
                                  <Download size={15}/> تحميل اللحن
                                </button>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  );
                })()}
              </div>
            )}

            {/* TAB 2: درجاتك — QR + كود */}
            {showPublicGrades && (
              <div>
                {/* Hero */}
                {!publicStudentResult && !showConfirmSearch && (
                  <div style={{ textAlign:'center', marginBottom:22 }}>
                    <div style={{ fontSize:52, marginBottom:10 }}>🎓</div>
                    <h1 style={{ fontSize:22, fontWeight:900, color:'var(--gold)', marginBottom:6 }}>اعرف نتيجتك دلوقتي!</h1>
                    <p style={{ color:'var(--muted)', fontSize:13 }}>ادخل كودك أو Scan الـ QR Code</p>
                  </div>
                )}

                {/* Search methods */}
                {!showConfirmSearch && !publicStudentResult && (
                  <div style={{ display:'flex', flexDirection:'column', gap:12 }}>

                    {/* QR Method */}
                    <div style={{ borderRadius:20, border: showScanner ? '2px solid rgba(13,148,136,.5)' : '1.5px solid var(--border)', background: showScanner ? 'rgba(13,148,136,.05)' : 'var(--bg-card)', backdropFilter:'blur(20px)', overflow:'hidden', padding:'20px 18px', transition:'all .25s' }}>
                      <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom: showScanner ? 16 : 0 }}>
                        <div style={{ width:50, height:50, borderRadius:16, background:'linear-gradient(135deg,#0d9488,#2dd4bf)', display:'flex', alignItems:'center', justifyContent:'center', boxShadow:'0 6px 24px rgba(13,148,136,.35)', flexShrink:0 }}>
                          <QrCode size={22} color="#fff"/>
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
                            style={{ flexShrink:0, padding:'11px 20px', borderRadius:13, border:'none', cursor:'pointer', background:'linear-gradient(135deg,#0d9488,#2dd4bf)', color:'#fff', fontFamily:'Cairo,sans-serif', fontWeight:900, fontSize:14, display:'flex', alignItems:'center', gap:8, boxShadow:'0 5px 22px rgba(13,148,136,.3)' }}>
                            <Camera size={17}/> ابدأ
                          </button>
                        )}
                      </div>
                      {showScanner && (
                        <div>
                          <div style={{ background:'rgba(13,148,136,.06)', border:'1px solid rgba(13,148,136,.2)', borderRadius:12, padding:'10px 14px', marginBottom:12, display:'flex', alignItems:'center', gap:10 }}>
                            <div style={{ width:10, height:10, borderRadius:'50%', background:'var(--teal)', flexShrink:0 }}/>
                            <p style={{ color:'var(--teal)', fontWeight:700, fontSize:13 }}>🎯 وجّه الكاميرا على الـ QR Code</p>
                          </div>
                          <div id="qr-reader-public" style={{ borderRadius:18, overflow:'hidden', border:'3px solid var(--teal)', marginBottom:12, boxShadow:'0 8px 30px rgba(0,0,0,.2)' }}/>
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
                      <div style={{ flex:1, height:1, background:'linear-gradient(90deg,transparent,var(--border),transparent)' }}/>
                      <div style={{ background:'var(--bg-card)', border:'1px solid var(--border)', borderRadius:99, padding:'4px 16px' }}>
                        <span style={{ color:'var(--violet)', fontWeight:900, fontSize:13 }}>أو</span>
                      </div>
                      <div style={{ flex:1, height:1, background:'linear-gradient(90deg,transparent,var(--border),transparent)' }}/>
                    </div>

                    {/* Code Method */}
                    <div style={{ borderRadius:20, border:'1.5px solid var(--border)', background:'var(--bg-card)', backdropFilter:'blur(20px)', padding:'20px 18px' }}>
                      <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:16 }}>
                        <div style={{ width:50, height:50, borderRadius:16, background:'linear-gradient(135deg,#4f46e5,#7c3aed)', display:'flex', alignItems:'center', justifyContent:'center', boxShadow:'0 6px 24px rgba(79,70,229,.3)', flexShrink:0 }}>
                          <Key size={22} color="#fff"/>
                        </div>
                        <div>
                          <h2 style={{ fontWeight:900, fontSize:16, marginBottom:1, color:'var(--text)' }}>⌨️ أدخل الكود</h2>
                          <p style={{ color:'var(--muted)', fontSize:12 }}>الكود الخاص بيك من المدرسة</p>
                        </div>
                      </div>
                      <input type="text" placeholder="TEN-XXXXXX" value={publicStudentCode}
                        onChange={e => { setPublicStudentCode(e.target.value.toUpperCase()); setPublicResultError(''); }}
                        onKeyPress={e => { if (e.key === 'Enter' && publicStudentCode.trim()) searchPublicStudent(); }}
                        style={{ width:'100%', padding:'15px 18px', fontFamily:'Courier New,monospace', fontSize:20, fontWeight:900, textAlign:'center', letterSpacing:6, textTransform:'uppercase', background:'var(--inp-bg)', border:'2px solid rgba(99,102,241,.3)', borderRadius:15, color:'var(--text)', outline:'none', boxSizing:'border-box', marginBottom:12 }}/>
                      <button onClick={searchPublicStudent} disabled={publicSearching || !publicStudentCode.trim()}
                        style={{ width:'100%', padding:'14px', borderRadius:15, border:'none', cursor:(!publicStudentCode.trim()||publicSearching)?'not-allowed':'pointer',
                          background:(!publicStudentCode.trim()||publicSearching)?'var(--inp-bg)':'linear-gradient(135deg,#4f46e5,#7c3aed)',
                          color:(!publicStudentCode.trim()||publicSearching)?'var(--muted)':'#fff',
                          fontFamily:'Cairo,sans-serif', fontWeight:900, fontSize:15,
                          display:'flex', alignItems:'center', justifyContent:'center', gap:10,
                          boxShadow:(!publicStudentCode.trim()||publicSearching)?'none':'0 6px 28px rgba(79,70,229,.35)', transition:'all .25s' }}>
                        {publicSearching
                          ? <><span style={{ width:18,height:18,border:'2.5px solid rgba(255,255,255,.3)',borderTopColor:'#fff',borderRadius:'50%',animation:'spin .85s linear infinite',display:'inline-block' }}/> جاري البحث...</>
                          : <><Search size={18}/> دوّر على درجاتي! 🎯</>}
                      </button>
                      {publicResultError && (
                        <div style={{ marginTop:12, background:'rgba(244,63,94,.06)', border:'1px solid rgba(244,63,94,.22)', borderRadius:13, padding:'14px', textAlign:'center' }}>
                          <div style={{ fontSize:28, marginBottom:6 }}>😬</div>
                          <p style={{ color:'var(--rose)', fontWeight:700, fontSize:13, marginBottom:8 }}>{publicResultError}</p>
                          <button onClick={() => { setPublicResultError(''); setPublicStudentCode(''); }}
                            style={{ padding:'6px 16px', borderRadius:9, border:'1px solid rgba(244,63,94,.3)', background:'rgba(244,63,94,.08)', color:'var(--rose)', fontFamily:'Cairo,sans-serif', fontWeight:700, fontSize:12, cursor:'pointer' }}>
                            حاول تاني 🔄
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Confirm after QR scan */}
                {showConfirmSearch && sessionStorage.getItem('tempStudentName') && (
                  <div style={{ textAlign:'center', animation:'fadeUp .4s cubic-bezier(.16,1,.3,1) both' }}>
                    <div style={{ fontSize:60, marginBottom:12 }}>🤔</div>
                    <h2 style={{ fontSize:22, fontWeight:900, marginBottom:16, color:'var(--text)' }}>هل أنت...؟</h2>
                    <div style={{ background:'linear-gradient(135deg,var(--gold-glow),rgba(99,102,241,.08))', border:'2px solid var(--border-g)', borderRadius:22, padding:'22px 20px', marginBottom:22 }}>
                      <p style={{ fontSize:28, fontWeight:900, color:'var(--gold)' }}>{sessionStorage.getItem('tempStudentName')}</p>
                    </div>
                    <div style={{ display:'flex', gap:12 }}>
                      <button onClick={async () => {
                        setShowConfirmSearch(false);
                        setPublicSearching(true);
                        setPublicStudentCode(scannedCode);
                        const code = scannedCode.trim().toUpperCase();
                        try {
                          const result = await fetchPublicStudentResultByCode(code);
                          if (!result) { setPublicResultError('❌ الكود غير صحيح!'); return; }
                          setPublicStudentResult(result);
                        } catch { setPublicResultError('⚠️ حدث خطأ'); }
                        finally { setPublicSearching(false); sessionStorage.removeItem('tempStudentName'); }
                      }}
                        style={{ flex:1, padding:'14px', borderRadius:16, border:'none', cursor:'pointer', background:'linear-gradient(135deg,#10b981,#059669)', color:'#fff', fontFamily:'Cairo,sans-serif', fontWeight:900, fontSize:16, display:'flex', alignItems:'center', justifyContent:'center', gap:8 }}>
                        <Check size={22}/> أيوه أنا! 😄
                      </button>
                      <button onClick={() => { setShowConfirmSearch(false); setScannedCode(''); setPublicStudentCode(''); setPublicResultError(''); sessionStorage.removeItem('tempStudentName'); }}
                        style={{ flex:1, padding:'14px', borderRadius:16, border:'none', cursor:'pointer', background:'linear-gradient(135deg,#f43f5e,#be123c)', color:'#fff', fontFamily:'Cairo,sans-serif', fontWeight:900, fontSize:16, display:'flex', alignItems:'center', justifyContent:'center', gap:8 }}>
                        <XCircle size={22}/> لأ 🙅
                      </button>
                    </div>
                  </div>
                )}

                {/* Loading */}
                {publicSearching && (
                  <div style={{ position:'fixed', inset:0, background:isDark?'rgba(0,0,0,.78)':'rgba(240,242,248,.85)', backdropFilter:'blur(14px)', zIndex:60, display:'flex', alignItems:'center', justifyContent:'center' }}>
                    <div style={{ textAlign:'center' }}>
                      <div style={{ position:'relative', width:90, height:90, margin:'0 auto 20px' }}>
                        <div style={{ position:'absolute', inset:0, border:'3px solid var(--border)', borderRadius:'50%' }}/>
                        <div style={{ position:'absolute', inset:0, border:'3px solid transparent', borderTopColor:'var(--violet)', borderRadius:'50%', animation:'spin .85s linear infinite' }}/>
                        <div style={{ position:'absolute', inset:0, display:'flex', alignItems:'center', justifyContent:'center' }}>
                          <span style={{ fontSize:32 }}>🔍</span>
                        </div>
                      </div>
                      <h2 style={{ fontSize:20, fontWeight:900, marginBottom:6, color:'var(--text)' }}>بندور على درجاتك</h2>
                      <p style={{ color:'var(--muted)', fontSize:13 }}>ثانية يا صديقي... ✨</p>
                    </div>
                  </div>
                )}

                {/* Result */}
                {publicStudentResult && (
                  <div style={{ animation:'fadeUp .5s cubic-bezier(.16,1,.3,1) both' }}>
                    <div style={{ borderRadius:22, overflow:'hidden', marginBottom:14, padding:'26px 20px', textAlign:'center', background:'linear-gradient(135deg,rgba(99,102,241,.12),var(--gold-glow),rgba(13,148,136,.1))', border:'1px solid var(--border-g)' }}>
                      <div style={{ fontSize:48, marginBottom:10 }}>🎉</div>
                      <h2 style={{ fontSize:20, fontWeight:900, marginBottom:4, color:'var(--text)' }}>
                        عامل ايه يا <span style={{ color:'var(--gold)' }}>{publicStudentResult.name}</span>!
                      </h2>
                      <p style={{ color:'var(--muted)', fontSize:13 }}>سنة {publicStudentResult.age||'-'}</p>
                    </div>

                    {/* Attendance */}
                    <div style={{ background:'rgba(13,148,136,.06)', border:'1px solid rgba(13,148,136,.15)', borderRadius:16, padding:'14px 16px', marginBottom:10 }}>
                      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:8 }}>
                        <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                          <span style={{ fontSize:22 }}>📅</span>
                          <div>
                            <p style={{ fontWeight:900, fontSize:14, color:'var(--text)' }}>الحضور</p>
                            <p style={{ color:'var(--muted)', fontSize:11 }}>حضرت {publicStudentResult.attendedCount} من {publicStudentResult.totalSessions} حصة</p>
                          </div>
                        </div>
                        <div><span style={{ fontSize:24, fontWeight:900, color:'var(--teal)' }}>{publicStudentResult.attendance}</span><span style={{ fontSize:12, color:'var(--muted)' }}>/30</span></div>
                      </div>
                      <div style={{ height:6, background:'var(--border)', borderRadius:99, overflow:'hidden' }}>
                        <div style={{ height:'100%', borderRadius:99, background:'linear-gradient(90deg,var(--teal),#2dd4bf)', width:`${Math.min(100,parseFloat(publicStudentResult.attendance)/30*100)}%`, transition:'width 1.2s cubic-bezier(.16,1,.3,1)' }}/>
                      </div>
                    </div>

                    {/* Exams */}
                    {[
                      { label:'امتحان الشهر', icon:'📝', data:publicStudentResult.monthly, max:30, color:'#3b82f6', bg:'rgba(59,130,246,.06)', border:'rgba(59,130,246,.15)',
                        subs:[{l:'قبطي',k:'coptic',m:10},{l:'طقس',k:'liturgy',m:10},{l:'تسميع',k:'oral',m:10}] },
                      { label:'الامتحان النهائي', icon:'🏆', data:publicStudentResult.final, max:50, color:'var(--rose)', bg:'rgba(244,63,94,.06)', border:'rgba(244,63,94,.15)',
                        subs:[{l:'قبطي',k:'coptic',m:15},{l:'طقس',k:'liturgy',m:15},{l:'تسميع',k:'oral',m:20}] },
                    ].map((exam, ei) => {
                      const data = exam.data || {};
                      const base = (data.coptic||0)+(data.liturgy||0)+(data.oral||0);
                      const bonus = parseFloat(data.bonus||0);
                      const tot = base+bonus;
                      const pct = Math.min(100, tot/exam.max*100);
                      return (
                        <div key={ei} style={{ background:exam.bg, border:`1px solid ${exam.border}`, borderRadius:16, padding:'14px 16px', marginBottom:10 }}>
                          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:10 }}>
                            <div style={{ display:'flex', alignItems:'center', gap:8 }}><span style={{ fontSize:20 }}>{exam.icon}</span><p style={{ fontWeight:900, fontSize:14, color:'var(--text)' }}>{exam.label}</p></div>
                            <div style={{ display:'flex', alignItems:'baseline', gap:3 }}>
                              {bonus>0 && <span style={{ fontSize:11, fontWeight:900, color:'#f59e0b', background:'rgba(245,158,11,.12)', border:'1px solid rgba(245,158,11,.25)', borderRadius:6, padding:'2px 7px', marginLeft:4 }}>+{bonus.toFixed(1)} 🎁</span>}
                              <span style={{ fontSize:26, fontWeight:900, color:exam.color }}>{tot.toFixed(1)}</span>
                              <span style={{ fontSize:12, color:'var(--muted)' }}>/{exam.max}</span>
                            </div>
                          </div>
                          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:7, marginBottom:8 }}>
                            {(exam.subs||[]).map((sub,si)=>(
                              <div key={si} style={{ background:'var(--inp-bg)', borderRadius:10, padding:'9px 11px', border:'1px solid var(--border)' }}>
                                <p style={{ color:'var(--muted)', fontSize:10, fontWeight:700, marginBottom:3 }}>{sub.l}</p>
                                <div style={{ display:'flex', alignItems:'baseline', gap:3 }}>
                                  <span style={{ fontSize:20, fontWeight:900, color:exam.color }}>{parseFloat(data[sub.k]||0).toFixed(1)}</span>
                                  <span style={{ fontSize:10, color:'var(--muted)' }}>/{sub.m}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                          <div style={{ height:5, background:'var(--border)', borderRadius:99, overflow:'hidden' }}>
                            <div style={{ height:'100%', borderRadius:99, background:exam.color, width:`${pct}%`, transition:'width 1s .3s cubic-bezier(.16,1,.3,1)' }}/>
                          </div>
                        </div>
                      );
                    })}

                    {/* Total */}
                    <div style={{ textAlign:'center', padding:'26px 20px', marginTop:6, background:'linear-gradient(135deg,var(--gold-glow),rgba(245,158,11,.06),rgba(139,92,246,.08))', border:'2px solid var(--border-g)', borderRadius:22 }}>
                      <p style={{ color:'var(--muted)', fontSize:13, marginBottom:6 }}>✨ المجموع الكلي ✨</p>
                      <div style={{ fontSize:68, fontWeight:900, color:'var(--gold)', lineHeight:1, fontFamily:'Cairo,sans-serif', marginBottom:4 }}>{publicStudentResult.total}</div>
                      <p style={{ color:'var(--muted)', fontSize:13, marginBottom:14 }}>من 100 درجة</p>
                      <div style={{ display:'inline-flex', alignItems:'center', gap:8, background:'var(--inp-bg)', borderRadius:99, padding:'9px 24px', border:`1.5px solid ${publicStudentResult.grade.color}33` }}>
                        <span style={{ fontSize:22 }}>{parseFloat(publicStudentResult.total)>=85?'🥇':parseFloat(publicStudentResult.total)>=75?'🥈':parseFloat(publicStudentResult.total)>=65?'🥉':parseFloat(publicStudentResult.total)>=50?'✅':'⏳'}</span>
                        <span style={{ fontSize:22, fontWeight:900, color:publicStudentResult.grade.color }}>{publicStudentResult.grade.text}</span>
                      </div>
                    </div>

                    <button onClick={() => { setPublicStudentResult(null); setPublicStudentCode(''); setPublicResultError(''); setScannedCode(''); sessionStorage.removeItem('tempStudentName'); }}
                      style={{ width:'100%', marginTop:12, padding:'14px', borderRadius:15, border:'none', cursor:'pointer', background:'linear-gradient(135deg,#4f46e5,#7c3aed)', color:'#fff', fontFamily:'Cairo,sans-serif', fontWeight:900, fontSize:15, display:'flex', alignItems:'center', justifyContent:'center', gap:10, boxShadow:'0 6px 28px rgba(79,70,229,.3)' }}>
                      <Search size={18}/> ابحث عن طالب آخر 🔍
                    </button>
                  </div>
                )}
              </div>
            )}
            <div style={{ marginTop:28, textAlign:'center' }}><p style={{ fontSize:11, color:'var(--muted)', opacity:.4 }}> تين اويه انسوك☁️</p></div>
          </div>
        </div>
      </>
    );
  }

  /* ══════════════════════════════════════════════
     LOADING
  ══════════════════════════════════════════════ */
  /* ══════════════════════════════════════════════
     LOADING
  ══════════════════════════════════════════════ */
  if (loading) {
    return (
      <>
        <GlobalStyles /><BgDeco isDark={isDark} />
        <div style={{ minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', position:'relative', zIndex:1 }}>
          <div style={{ textAlign:'center' }}>
            <div style={{ width:64, height:64, border:'4px solid var(--border)', borderTopColor:'var(--gold)', borderRadius:'50%', animation:'spin 1s linear infinite', margin:'0 auto 18px' }}/>
            <p style={{ fontSize:16, fontWeight:700, color:'var(--gold)' }}>جاري التحميل...</p>
            <div style={{ display:'flex', justifyContent:'center', marginTop:12 }}><span className="dot"/><span className="dot"/><span className="dot"/></div>
          </div>
        </div>
      </>
    );
  }

  /* ══════════════════════════════════════════════
     MAIN DASHBOARD
  ══════════════════════════════════════════════ */
  return (
    <>
      <GlobalStyles />
      <BgDeco isDark={isDark} />
      <div style={{ position:'relative', zIndex:1 }} dir="rtl">
        <Toaster position="top-center" toastOptions={{
          style:{
            background: isDark ? '#141428' : '#ffffff',
            color: isDark ? '#f0f0f0' : '#1a1a2e',
            fontSize:14, fontWeight:700,
            border:`1px solid var(--border-g)`,
            borderRadius:11,
            boxShadow: isDark ? '0 8px 30px rgba(0,0,0,.4)' : '0 8px 30px rgba(0,0,0,.1)'
          },
          success:{ iconTheme:{ primary:'var(--green)', secondary: isDark ? '#141428' : '#fff' } },
          error:  { iconTheme:{ primary:'var(--rose)',  secondary: isDark ? '#141428' : '#fff' } },
        }}/>

        {/* ── QR Modal ── */}
        {showQRModal && selectedStudentForQR && (
          <div className="modal-overlay" onClick={()=>setShowQRModal(false)}>
            <div className="modal" onClick={e=>e.stopPropagation()}>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:18 }}>
                <h2 style={{ fontWeight:900, fontSize:18, color:'var(--text)' }}>QR Code</h2>
                <button onClick={()=>setShowQRModal(false)} style={{ background:'none', border:'none', cursor:'pointer', color:'var(--muted)' }}><XCircle size={22}/></button>
              </div>
              <div style={{ textAlign:'center', marginBottom:16 }}>
                <p style={{ fontSize:18, fontWeight:900, color:'var(--gold)', marginBottom:6 }}>{selectedStudentForQR.name}</p>
                <span className="badge badge-violet">{selectedStudentForQR.student_code}</span>
              </div>
              <div style={{ display:'flex', justifyContent:'center', padding:18, background:'#fff', borderRadius:14, marginBottom:16 }}>
                <QRCodeCanvas id="qr-code-canvas" value={selectedStudentForQR.student_code} size={200} level="H" includeMargin/>
              </div>
              <button onClick={downloadQRCode} className="btn btn-gold" style={{ width:'100%', marginBottom:8 }}><Download size={16}/> تحميل QR</button>
              <button onClick={()=>setShowQRModal(false)} className="btn btn-ghost" style={{ width:'100%' }}>إغلاق</button>
            </div>
          </div>
        )}

        {/* ── Scanner Modal ── */}
        {showScanner && (
  <div className="modal-overlay">
    <div className="modal" style={{ maxWidth:440 }}>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:16 }}>
        <h2 style={{ fontWeight:900, fontSize:18, color:'var(--text)' }}>📷 Scan QR</h2>
        <button onClick={stopScanner} style={{ background:'none', border:'none', cursor:'pointer', color:'var(--muted)' }}><XCircle size={22}/></button>
      </div>
      <div style={{ background:'var(--gold-glow)', border:'1px solid var(--border-g)', borderRadius:9, padding:'9px 14px', textAlign:'center', marginBottom:12 }}>
        <span style={{ color:'var(--gold)', fontWeight:700, fontSize:13 }}>الحصة رقم: {selectedSession}</span>
      </div>

      {scannedStudentData && (
        <div className={scannedStudentData.success?'scan-ok':scannedStudentData.type==='already_registered'?'scan-warn':'scan-err'}
          style={{ padding:20, borderRadius:12, textAlign:'center', marginBottom:14 }}>
          <div style={{ fontSize:40, marginBottom:8 }}>
            {scannedStudentData.success?'✅':scannedStudentData.type==='already_registered'?'⚠️':'❌'}
          </div>
          <h3 style={{ fontSize:18, fontWeight:900, marginBottom:5, color:'var(--text)' }}>
            {scannedStudentData.studentName||'غير معروف'}
          </h3>
          <p style={{ fontWeight:700, fontSize:13, color:'var(--text)' }}>
            {scannedStudentData.message}
          </p>
        </div>
      )}

      {scannedStudentData ? (
        <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
          <button onClick={resumeScanning} className="btn btn-violet btn-lg" style={{ width:'100%' }}>
            <Camera size={20}/> الطالب اللي بعده ▶️
          </button>
          <button onClick={stopScanner} className="btn btn-rose" style={{ width:'100%' }}>
            <XCircle size={16}/> إغلاق
          </button>
        </div>
      ) : (
        <>
          <div style={{ background:'rgba(13,148,136,.06)', border:'1px solid rgba(13,148,136,.18)', borderRadius:9, padding:'9px', textAlign:'center', marginBottom:10 }}>
            <p style={{ color:'var(--teal)', fontWeight:700, fontSize:13 }}>🎯 وجه الكاميرا على الـ QR</p>
          </div>
          <div id="qr-reader" style={{ borderRadius:10, overflow:'hidden', border:'2.5px solid var(--violet)', marginBottom:10 }}/>
          <button onClick={stopScanner} className="btn btn-rose" style={{ width:'100%' }}>
            <XCircle size={16}/> إغلاق
          </button>
        </>
      )}

      {scannerError && (
        <div style={{ marginTop:10, color:'var(--rose)', textAlign:'center', fontWeight:700, fontSize:13 }}>
          {scannerError}
        </div>
      )}
    </div>
  </div>
)}

        {/* ── Absent Modal ── */}
        {showAbsentModal && selectedSessionAbsent !== null && (
          <div className="modal-overlay" onClick={()=>setShowAbsentModal(false)}>
            <div className="modal" style={{ maxWidth:500 }} onClick={e=>e.stopPropagation()}>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:16 }}>
                <h2 style={{ fontWeight:900, fontSize:17, color:'var(--text)' }}>الغايبين — الحصة {selectedSessionAbsent+1}</h2>
                <button onClick={()=>setShowAbsentModal(false)} style={{ background:'none', border:'none', cursor:'pointer', color:'var(--muted)' }}><XCircle size={22}/></button>
              </div>
              {getAbsentStudents(selectedSessionAbsent).length > 0 ? (
                <>
                  <div style={{ background:'rgba(244,63,94,.06)', border:'1px solid rgba(244,63,94,.2)', borderRadius:9, padding:'10px', textAlign:'center', marginBottom:14 }}>
                    <span style={{ color:'var(--rose)', fontWeight:700, fontSize:14 }}>عدد الغايبين: {getAbsentStudents(selectedSessionAbsent).length}</span>
                  </div>
                  <div style={{ display:'flex', flexDirection:'column', gap:8, maxHeight:'50vh', overflowY:'auto' }}>
                    {getAbsentStudents(selectedSessionAbsent).map((s,i) => (
                      <div key={s.id} style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'10px 14px', background:'rgba(244,63,94,.05)', border:'1px solid rgba(244,63,94,.15)', borderRadius:10 }}>
                        <div style={{ display:'flex', alignItems:'center', gap:12 }}>
                          <div style={{ width:32, height:32, borderRadius:'50%', background:'var(--rose)', display:'flex', alignItems:'center', justifyContent:'center', fontWeight:900, fontSize:12, color:'#fff', flexShrink:0 }}>{i+1}</div>
                          <div>
                            <p style={{ fontWeight:700, fontSize:13, color:'var(--text)' }}>{s.name}</p>
                            <p style={{ color:'var(--muted)', fontSize:11 }}>سنة {s.age||'-'}</p>
                          </div>
                        </div>
                        {s.phone && (
                          <a href={`https://wa.me/20${s.phone.replace(/\s+/g,'').replace(/^00/,'').replace(/^\+/,'').replace(/^20/,'').replace(/^0/,'')}`} target="_blank" rel="noopener noreferrer" className="btn btn-green btn-sm">واتساب</a>
                        )}
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <div style={{ textAlign:'center', padding:'32px 0' }}>
                  <div style={{ fontSize:48, marginBottom:10 }}>🎉</div>
                  <p style={{ fontSize:20, fontWeight:900, color:'var(--green)' }}>كل الطلاب حاضرين!</p>
                </div>
              )}
              <button onClick={()=>setShowAbsentModal(false)} className="btn btn-ghost" style={{ width:'100%', marginTop:14 }}>إغلاق</button>
            </div>
          </div>
        )}

        {/* ── Mobile Top Bar ── */}
        <div className="topbar">
          <button onClick={()=>setSidebarOpen(true)} style={{ width:38,height:38,borderRadius:10,background:'var(--toggle-bg)',border:'1px solid var(--border)',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0 }}>
            <Menu size={18} color="var(--text)"/>
          </button>
          <span className="shimmer" style={{ fontWeight:900, fontSize:14 }}>الألحان</span>
          <div style={{ display:'flex', alignItems:'center', gap:6 }}>
            <div style={{ display:'flex',alignItems:'center',gap:5,background:'var(--gold-glow)',border:'1px solid var(--border-g)',borderRadius:99,padding:'4px 9px' }}>
              <div style={{ width:22,height:22,borderRadius:'50%',background:'linear-gradient(135deg,var(--violet),var(--gold))',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0,fontSize:11,color:'#fff',fontWeight:900 }}>
                {currentUser?.name?.charAt(0)||'👤'}
              </div>
              <span style={{ fontSize:11,fontWeight:700,color:'var(--gold)',whiteSpace:'nowrap',maxWidth:60,overflow:'hidden',textOverflow:'ellipsis' }}>
                {currentUser?.name?.split(' ')[0]||'مرحباً'}
              </span>
            </div>
          </div>
        </div>

        {/* ── Layout ── */}
        <div className="main-layout">
          {/* Sidebar */}
          <aside className={`sidebar${sidebarOpen?' open':''}`}>
            {/* Header */}
            <div style={{ padding:'16px 13px 14px', borderBottom:'1px solid var(--border)', flexShrink:0 }}>
              <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:12 }}>
                <div style={{ display:'flex', alignItems:'center', gap:10 }}>
                  <div style={{ width:38, height:38, borderRadius:'50%', overflow:'hidden', border:'2px solid var(--border-g)', flexShrink:0 }}>
                    <img src="https://i.postimg.cc/SN8hss4C/2.jpg" alt="" style={{ width:'100%', height:'100%', objectFit:'cover' }} onError={e=>e.target.style.display='none'}/>
                  </div>
                  <div>
                    <p style={{ fontWeight:900, fontSize:13, color:'var(--text)' }}>مدرسة الألحان</p>
                    <p style={{ color:'var(--muted)', fontSize:9 }}>تين اويه انسوك</p>
                  </div>
                </div>
                <div style={{ display:'flex', alignItems:'center', gap:6 }}>
                  <SettingsMenu
                    isDark={isDark}
                    onToggle={toggleTheme}
                    isOpen={showSettingsMenu}
                    onOpenChange={setShowSettingsMenu}
                    dropdownClass="from-sidebar"
                  />
                  <button onClick={()=>setSidebarOpen(false)} style={{ background:'var(--toggle-bg)', border:'1px solid var(--border)', borderRadius:8, width:30, height:30, cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center' }}>
                    <X size={15} color="var(--muted)"/>
                  </button>
                </div>
              </div>
              {/* Welcome card */}
              <div style={{ background:`linear-gradient(135deg,var(--gold-glow),rgba(139,92,246,.07))`, border:'1px solid var(--border-g)', borderRadius:11, padding:'9px 12px', display:'flex', alignItems:'center', gap:10 }}>
                <div style={{ width:32, height:32, borderRadius:'50%', background:'linear-gradient(135deg,var(--violet),var(--gold))', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, fontWeight:900, fontSize:13, color:'#fff' }}>
                  {currentUser?.name?.charAt(0)||'?'}
                </div>
                <div style={{ minWidth:0 }}>
                  <p style={{ fontSize:9, color:'var(--muted)', lineHeight:1.2 }}>مرحباً يا</p>
                  <p style={{ fontWeight:900, fontSize:13, color:'var(--gold)', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>
                    {currentUser?.name}
                  </p>
                </div>
              </div>
            </div>

            {/* Nav */}
            <nav style={{ padding:'10px 10px', flex:1, overflowY:'auto', minHeight:0 }}>
              {navItems.map(item => (
                <button key={item.id} onClick={()=>{ setCurrentPage(item.id); setSidebarOpen(false); }}
                  className={`nav-item${currentPage===item.id?' active':''}`}>
                  <item.icon size={16}/>
                  <span>{item.label}</span>
                </button>
              ))}
            </nav>

            {/* Status */}
            <div style={{ padding:'0 10px', flexShrink:0 }}>
              {isOffline && (
                <div style={{ padding:'7px 11px', background:'rgba(244,63,94,.08)', border:'1px solid rgba(244,63,94,.2)', borderRadius:9, textAlign:'center', marginBottom:6 }}>
                  <p style={{ fontWeight:700, fontSize:11, color:'var(--rose)' }}>📴 وضع Offline</p>
                </div>
              )}
              {pendingChanges.length > 0 && (
                <div style={{ padding:'7px 11px', background:'rgba(245,158,11,.08)', border:'1px solid rgba(245,158,11,.2)', borderRadius:9, textAlign:'center', marginBottom:6 }}>
                  <p style={{ fontWeight:700, fontSize:11, color:'#f59e0b' }}>⏳ {pendingChanges.length} تغيير</p>
                  {!isOffline && <button onClick={syncPendingChanges} className="btn btn-gold btn-sm" style={{ marginTop:5, width:'100%', fontSize:11, padding:'5px 0' }}>مزامنة</button>}
                </div>
              )}
            </div>

            {/* Logout */}
            <div className="sidebar-logout" style={{ padding:'10px 10px 16px', borderTop:'1px solid var(--border)', flexShrink:0, background:'var(--sidebar-bg)' }}>
              <button onClick={handleLogout}
                style={{ width:'100%', padding:'11px 0', borderRadius:11, border:'1px solid rgba(244,63,94,.25)', background:'rgba(244,63,94,.07)', color:'var(--rose)', fontFamily:'Cairo,sans-serif', fontWeight:900, fontSize:13, cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', gap:8, transition:'background .2s' }}
                onMouseEnter={e=>e.currentTarget.style.background='rgba(244,63,94,.18)'}
                onMouseLeave={e=>e.currentTarget.style.background='rgba(244,63,94,.07)'}>
                <LogOut size={14}/> تسجيل الخروج
              </button>
              <p style={{ textAlign:'center', color:'var(--muted)', opacity:.4, fontSize:9, marginTop:7 }}>تين اويه انسوك☁️</p>
            </div>
          </aside>

          {/* Sidebar overlay */}
          {sidebarOpen && <div style={{ position:'fixed', inset:0, background:'rgba(0,0,0,.5)', zIndex:39 }} onClick={()=>setSidebarOpen(false)}/>}

          {/* Bottom Navigation */}
          <nav className="bottom-nav">
            {[
              { id:'dashboard',    Icon:BarChart3,    label:'إحصائيات', emoji:'📊' },
              { id:'students',     Icon:Users,        label:'الطلاب',   emoji:'👥' },
              { id:'attendance',   Icon:ClipboardList,label:'الحضور',   emoji:'📋' },
              { id:'qr-scanner',  Icon:QrCode,       label:'QR Scan',  emoji:'📷' },
              { id:'exams',       Icon:FileText,     label:'امتحانات', emoji:'📝' },
            ].map(item => (
              <button key={item.id} onClick={()=>setCurrentPage(item.id)}
                className={`bnav-item${currentPage===item.id?' active':''}`}>
                <item.Icon size={20}/>
                <span>{currentPage===item.id ? item.emoji : item.label}</span>
              </button>
            ))}
            <button onClick={()=>setSidebarOpen(true)} className={`bnav-item${['results','student-check'].includes(currentPage)?' active':''}`}>
              <Menu size={20}/>
              <span>المزيد</span>
            </button>
          </nav>

          {/* ── Page Content ── */}
          <main className="page-content">

            {/* ══ DASHBOARD ══ */}
            {currentPage === 'dashboard' && (
              <div className="anim-up">
                <h1 className="page-title" style={{ marginBottom:18 }}>📊 الإحصائيات</h1>
                <div className="grid-stats">
                  {[
                    { label:'الطلاب', val:students.length, icon:Users, color:'var(--violet)', glow:'rgba(139,92,246,.08)' },
                    { label:'متوسط الحضور', val:students.length>0?`${(students.reduce((s,st)=>s+parseFloat(calcAtt(st.id)),0)/students.length/30*100).toFixed(0)}%`:'0%', icon:ClipboardList, color:'var(--green)', glow:'rgba(16,185,129,.08)' },
                    { label:'متوسط الدرجات', val:students.length>0?(students.reduce((s,st)=>s+parseFloat(calcTotal(st.id)),0)/students.length).toFixed(1):'0', icon:BarChart3, color:'var(--gold)', glow:'var(--gold-glow)' },
                  ].map((c,i) => (
                    <div key={i} className="glass" style={{ padding:'18px 16px', background:`linear-gradient(135deg,${c.glow},var(--bg-card))`, borderColor:`${c.color}22`, position:'relative', overflow:'hidden' }}>
                      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:10 }}>
                        <p style={{ color:'var(--muted)', fontSize:11, fontWeight:600 }}>{c.label}</p>
                        <div style={{ width:34, height:34, borderRadius:10, background:`${c.color}14`, display:'flex', alignItems:'center', justifyContent:'center' }}>
                          <c.icon size={18} color={c.color}/>
                        </div>
                      </div>
                      <p style={{ fontSize:30, fontWeight:900, color:c.color, lineHeight:1 }}>{c.val}</p>
                    </div>
                  ))}
                </div>

                <div className="glass" style={{ padding:20 }}>
                  <h2 style={{ fontWeight:800, fontSize:16, marginBottom:14, color:'var(--gold)' }}>🏆 أفضل 5 طلاب</h2>
                  <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
                    {[...students].sort((a,b)=>parseFloat(calcTotal(b.id))-parseFloat(calcTotal(a.id))).slice(0,5).map((s,i) => {
                      const score = calcTotal(s.id); const gr = getGrade(parseFloat(score));
                      return (
                        <div key={s.id} style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'10px 14px', background:'var(--inp-bg)', borderRadius:10, border:'1px solid var(--border)' }}>
                          <div style={{ display:'flex', alignItems:'center', gap:12 }}>
                            <span style={{ fontSize:20 }}>{'🥇🥈🥉4️⃣5️⃣'[i*2]+('🥇🥈🥉4️⃣5️⃣'[i*2+1]||'')}</span>
                            <span style={{ fontWeight:700, fontSize:13, color:'var(--text)' }}>{s.name}</span>
                          </div>
                          <div style={{ display:'flex', alignItems:'center', gap:12 }}>
                            <span style={{ fontWeight:900, fontSize:11, color:gr.color }}>{gr.text}</span>
                            <span style={{ fontWeight:900, fontSize:20, color:'var(--gold)' }}>{score}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* ══ STUDENTS ══ */}
            {currentPage === 'students' && (
              <div className="anim-up">
                <div className="page-header">
                  <h1 className="page-title">👥 إدارة الطلاب</h1>
                  <div style={{ display:'flex', gap:7, flexWrap:'wrap' }}>
                    <button onClick={()=>setShowAddStudent(true)} className="btn btn-gold btn-sm"><Plus size={14}/> إضافة</button>
                    <button onClick={exportStudentsToExcel} className="btn btn-green btn-sm"><Download size={14}/> Excel</button>
                    <button onClick={printAllQRCodes} className="btn btn-violet btn-sm"><QrCode size={14}/> QR</button>
                  </div>
                </div>

                {showAddStudent && (
                  <div className="glass2" style={{ padding:18, marginBottom:16 }}>
                    <h3 style={{ fontWeight:800, marginBottom:14, color:'var(--gold)', fontSize:15 }}>✨ طالب جديد</h3>
                    <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(160px,1fr))', gap:10, marginBottom:12 }}>
                      <input className="inp" type="text" placeholder="اسم الطالب *" value={newStudent.name} onChange={e=>setNewStudent({...newStudent,name:e.target.value})}/>
                      <select className="inp" value={newStudent.age} onChange={e=>setNewStudent({...newStudent,age:e.target.value})}>
                        <option value="4">سنة 4</option><option value="5">سنة 5</option><option value="6">سنة 6</option>
                      </select>
                      <input className="inp" type="text" placeholder="رقم الهاتف" value={newStudent.phone} onChange={e=>setNewStudent({...newStudent,phone:e.target.value})}/>
                      <input className="inp" type="text" placeholder="ملاحظات" value={newStudent.notes} onChange={e=>setNewStudent({...newStudent,notes:e.target.value})}/>
                    </div>
                    <div style={{ display:'flex', gap:8 }}>
                      <button onClick={addStudent} className="btn btn-green btn-sm">حفظ</button>
                      <button onClick={()=>{ setShowAddStudent(false); setNewStudent({name:'',phone:'',notes:'',age:'5'}); }} className="btn btn-ghost btn-sm">إلغاء</button>
                    </div>
                  </div>
                )}

                <div className="glass" style={{ padding:16 }}>
                  <div style={{ position:'relative', marginBottom:14 }}>
                    <Search style={{ position:'absolute', right:12, top:'50%', transform:'translateY(-50%)' }} size={14} color="var(--muted)"/>
                    <input className="inp" type="text" placeholder="البحث..." value={searchTerm} onChange={e=>setSearchTerm(e.target.value)} style={{ paddingRight:36 }}/>
                  </div>
                  <div className="tbl-wrap">
                    <table className="tbl">
                      <thead>
                        <tr><th>#</th><th>الاسم</th><th>الكود</th><th>السن</th><th className="hide-mobile">الهاتف</th><th className="hide-mobile">ملاحظات</th><th style={{ textAlign:'center' }}>⚙️</th></tr>
                      </thead>
                      <tbody>
                        {filteredStudents.map((s,i) => (
                          <tr key={s.id}>
                            {editingStudent?.id===s.id ? (
                              <>
                                <td style={{ color:'var(--muted)', fontWeight:700 }}>{i+1}</td>
                                <td><input className="inp" type="text" value={editingStudent.name} onChange={e=>setEditingStudent({...editingStudent,name:e.target.value})} style={{ padding:'5px 9px', fontSize:12 }}/></td>
                                <td><span className="badge badge-violet">{s.student_code||'-'}</span></td>
                                <td><select className="inp" value={editingStudent.age||'5'} onChange={e=>setEditingStudent({...editingStudent,age:e.target.value})} style={{ padding:'5px 9px', fontSize:12, width:'auto' }}><option value="4">4</option><option value="5">5</option><option value="6">6</option></select></td>
                                <td className="hide-mobile"><input className="inp" type="text" value={editingStudent.phone} onChange={e=>setEditingStudent({...editingStudent,phone:e.target.value})} style={{ padding:'5px 9px', fontSize:12 }}/></td>
                                <td className="hide-mobile"><input className="inp" type="text" value={editingStudent.notes} onChange={e=>setEditingStudent({...editingStudent,notes:e.target.value})} style={{ padding:'5px 9px', fontSize:12 }}/></td>
                                <td style={{ textAlign:'center' }}>
                                  <button onClick={updateStudent} className="btn btn-green btn-sm" style={{ marginLeft:5 }}>حفظ</button>
                                  <button onClick={()=>setEditingStudent(null)} className="btn btn-ghost btn-sm">إلغاء</button>
                                </td>
                              </>
                            ) : (
                              <>
                                <td style={{ color:'var(--muted)', fontWeight:700 }}>{i+1}</td>
                                <td style={{ fontWeight:700, fontSize:13 }}>{s.name}</td>
                                <td>
                                  <div style={{ display:'flex', alignItems:'center', gap:6 }}>
                                    <span className="badge badge-violet" style={{ fontFamily:'monospace', fontSize:10 }}>{s.student_code||'-'}</span>
                                    {s.student_code && (
                                      <>
                                        <button onClick={()=>copyToClipboard(s.student_code)} style={{ background:'none', border:'none', cursor:'pointer', color:copiedCode===s.student_code?'var(--green)':'var(--muted)', padding:0 }}>
                                          {copiedCode===s.student_code?<Check size={13}/>:<Copy size={13}/>}
                                        </button>
                                        <button onClick={()=>showStudentQR(s)} style={{ background:'none', border:'none', cursor:'pointer', color:'var(--teal)', padding:0 }}><QrCode size={13}/></button>
                                      </>
                                    )}
                                  </div>
                                </td>
                                <td style={{ fontSize:12, color:'var(--text)' }}>{s.age||'-'}</td>
                                <td className="hide-mobile">
                                  <div style={{ display:'flex', alignItems:'center', gap:7 }}>
                                    <span style={{ color:'var(--muted)', fontSize:12 }}>{s.phone||'-'}</span>
                                    {s.phone?.trim() && (
                                      <a href={`https://wa.me/20${s.phone.replace(/\s+/g,'').replace(/^\+/,'').replace(/^00/,'').replace(/^20/,'').replace(/^0/,'')}`} target="_blank" rel="noopener noreferrer"
                                        style={{ width:24, height:24, borderRadius:'50%', background:'#25D366', display:'inline-flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                                        <svg viewBox="0 0 24 24" style={{ width:13, height:13, fill:'white' }}><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                                      </a>
                                    )}
                                  </div>
                                </td>
                                <td className="hide-mobile" style={{ color:'var(--muted)', fontSize:12 }}>{s.notes}</td>
                                <td style={{ textAlign:'center' }}>
                                  <button onClick={()=>setEditingStudent(s)} style={{ background:'none', border:'none', cursor:'pointer', color:'var(--teal)', marginLeft:8 }}><Edit2 size={14}/></button>
                                  <button onClick={()=>deleteStudent(s.id)} style={{ background:'none', border:'none', cursor:'pointer', color:'var(--rose)' }}><Trash2 size={14}/></button>
                                </td>
                              </>
                            )}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* ══ ATTENDANCE ══ */}
            {currentPage === 'attendance' && (
              <div className="anim-up">
                <div className="page-header">
                  <h1 className="page-title">📋 تسجيل الحضور</h1>
                  <button onClick={()=>setCurrentPage('qr-scanner')} className="btn btn-teal btn-sm"><Camera size={14}/> Scan QR</button>
                </div>

                <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:10, marginBottom:16 }}>
                  {[1,2,3].map(sn => {
                    const cnt = students.filter(s=>attendance[s.id]?.[sn-1]).length;
                    const pct = students.length>0 ? cnt/students.length*100 : 0;
                    return (
                      <div key={sn} className="glass" style={{ padding:'14px 14px' }}>
                        <div style={{ display:'flex', justifyContent:'space-between', marginBottom:8 }}>
                          <span style={{ fontWeight:700, fontSize:12, color:'var(--text)' }}>ح{sn}</span>
                          {lockedSessions[sn-1] ? <Lock size={13} color="var(--rose)"/> : <Unlock size={13} color="var(--green)"/>}
                        </div>
                        <p style={{ fontSize:22, fontWeight:900, color:'var(--violet)' }}>{cnt}<span style={{ fontSize:11, color:'var(--muted)' }}>/{students.length}</span></p>
                        <div className="prog-track" style={{ marginTop:7 }}><div className="prog-fill" style={{ width:`${pct}%`, background:'var(--violet)' }}/></div>
                      </div>
                    );
                  })}
                </div>

                <div className="glass" style={{ padding:'12px 14px', marginBottom:12 }}>
                  <div style={{ position:'relative' }}>
                    <Search style={{ position:'absolute', right:12, top:'50%', transform:'translateY(-50%)' }} size={14} color="var(--muted)"/>
                    <input className="inp" type="text" placeholder="ابحث عن طالب..." value={attendanceSearch} onChange={e=>setAttendanceSearch(e.target.value)} style={{ paddingRight:36 }}/>
                  </div>
                </div>

                <div className="glass" style={{ padding:14 }}>
                  <div className="tbl-wrap">
                    <table className="tbl" style={{ minWidth:820 }}>
                      <thead>
                        <tr>
                          <th style={{ position:'sticky', right:0, background:'var(--tbl-head)', zIndex:2 }}>#</th>
<th style={{ position:'sticky', right:28, background:'var(--tbl-head)', minWidth:110, zIndex:2 }}>الطالب</th>
                          {Array.from({length:12},(_,i) => (
                            <th key={i} style={{ textAlign:'center', minWidth:58 }}>
                              <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:3 }}>
                                <div style={{ display:'flex', gap:3 }}>
  <button onClick={()=>toggleSessionLock(i)} style={{ background:'none', border:'none', cursor:'pointer', color:lockedSessions[i]?'var(--rose)':'var(--green)', padding:4, minWidth:24, minHeight:24 }}>
    {lockedSessions[i]?<Lock size={14}/>:<Unlock size={14}/>}
  </button>
  <button onClick={()=>showAbsentStudents(i)} style={{ background:'none', border:'none', cursor:'pointer', color:'var(--rose)', padding:4, minWidth:24, minHeight:24 }}>
    <Users size={14}/>
  </button>
</div>
                                <span style={{ fontSize:10 }}>ح{i+1}</span>
                              </div>
                            </th>
                          ))}
                          <th style={{ textAlign:'center', background:'rgba(139,92,246,.06)', color:'var(--violet)', fontSize:11 }}>الحضور</th>
                          <th style={{ textAlign:'center', background:'rgba(139,92,246,.06)', color:'var(--violet)', fontSize:11 }}>الدرجة</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredAttendanceStudents.map((s,idx) => {
                          const attended = attendance[s.id]?.filter(Boolean).length||0;
                          return (
                            <tr key={s.id}>
                              <td style={{ color:'var(--muted)', fontWeight:700, position:'sticky', right:0, background:'var(--bg-card)', zIndex:1 }}>{idx+1}</td>
<td style={{ fontWeight:700, whiteSpace:'nowrap', fontSize:12, position:'sticky', right:28, background:'var(--bg-card)', zIndex:1 }}>{s.name}</td>
                              {Array.from({length:12},(_,i) => (
                                <td key={i} style={{ textAlign:'center' }}>
                                  <input type="checkbox" className="chk" checked={attendance[s.id]?.[i]||false} onChange={()=>toggleAttendance(s.id,i)} disabled={lockedSessions[i]}/>
                                </td>
                              ))}
                              <td style={{ textAlign:'center', fontWeight:800, color:'var(--violet)', fontSize:12 }}>{attended}/12</td>
                              <td style={{ textAlign:'center', fontWeight:900, color:'var(--gold)', fontSize:13 }}>{calcAtt(s.id)}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* ══ QR SCANNER ══ */}
            {currentPage === 'qr-scanner' && (
              <div className="anim-up" style={{ maxWidth:560, margin:'0 auto' }}>
                <h1 className="page-title" style={{ textAlign:'center', marginBottom:18 }}>📷 تسجيل بـ QR</h1>

                <div className="glass2" style={{ padding:'20px 18px', textAlign:'center', marginBottom:16 }}>
                  <p style={{ color:'var(--muted)', marginBottom:10, fontSize:13 }}>الحاضرين في الحصة {selectedSession}</p>
                  <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:16 }}>
                    <div style={{ background:'rgba(16,185,129,.08)', border:'1px solid rgba(16,185,129,.2)', borderRadius:14, padding:'12px 24px' }}>
                      <p style={{ fontSize:44, fontWeight:900, color:'var(--green)', lineHeight:1 }}>{students.filter(s=>attendance[s.id]?.[selectedSession-1]).length}</p>
                      <p style={{ color:'var(--muted)', fontSize:11, marginTop:3 }}>حاضر</p>
                    </div>
                    <span style={{ fontSize:24, color:'var(--muted)' }}>/</span>
                    <div style={{ background:'var(--inp-bg)', border:'1px solid var(--border)', borderRadius:14, padding:'12px 24px' }}>
                      <p style={{ fontSize:44, fontWeight:900, color:'var(--text)', lineHeight:1 }}>{students.length}</p>
                      <p style={{ color:'var(--muted)', fontSize:11, marginTop:3 }}>إجمالي</p>
                    </div>
                  </div>
                  <div className="prog-track" style={{ marginTop:14, height:6 }}>
                    <div className="prog-fill" style={{ width:`${students.length>0?students.filter(s=>attendance[s.id]?.[selectedSession-1]).length/students.length*100:0}%`, background:'linear-gradient(90deg,var(--green),var(--teal))' }}/>
                  </div>
                </div>

                <div className="glass" style={{ padding:18, marginBottom:14 }}>
                  <h3 style={{ fontWeight:800, marginBottom:12, fontSize:14, display:'flex', alignItems:'center', gap:7, color:'var(--text)' }}><Key size={15} color="var(--gold)"/> تسجيل يدوي</h3>
                  <div style={{ display:'flex', gap:8 }}>
                    <input className="inp" type="text" placeholder="TEN-XXXXXX" value={scannedCode} onChange={e=>setScannedCode(e.target.value.toUpperCase())}
                      disabled={lockedSessions[selectedSession-1]||isScanPaused}
                      style={{ fontFamily:'monospace', fontSize:15, fontWeight:700, letterSpacing:2 }}
                      onKeyPress={async(e)=>{ if(e.key==='Enter'&&scannedCode.trim()&&!isScanPaused){ e.preventDefault();const c=scannedCode.trim(); 
                        setScannedCode('');
isScanPausedRef.current = false;
toast.loading('جاري التسجيل...',{id:'ms'});
const result = await onScanSuccess(c);
if(result?.success) toast.success('تم! ✅',{id:'ms'});
else toast.dismiss('ms');
setTimeout(()=>{setIsScanPaused(false);setScannedStudentData(null);},1500);
                       }}}
                    />
                    <button 
                    onClick={async()=>{
  if(isScanPaused) return;
  if(!scannedCode.trim()) return;
  const c = scannedCode.trim();
  setScannedCode('');
  isScanPausedRef.current = false;
  toast.loading('جاري التسجيل...',{id:'ms'});
  const result = await onScanSuccess(c);
  if(result?.success) toast.success('تم! ✅',{id:'ms'});
  else toast.dismiss('ms');
  setTimeout(()=>{setIsScanPaused(false);setScannedStudentData(null);},1500);
}}
                      disabled={lockedSessions[selectedSession-1]||isScanPaused} className="btn btn-gold" style={{ flexShrink:0 }}>
                      {isScanPaused?<span className="anim-spin" style={{ display:'inline-block',width:15,height:15,border:'2px solid rgba(0,0,0,.2)',borderTopColor:'#000',borderRadius:'50%'}}/>:<><Check size={15}/> سجّل</>}
                    </button>
                  </div>
                  {lockedSessions[selectedSession-1] && (
                    <p style={{ marginTop:8, color:'var(--rose)', fontWeight:700, fontSize:12, textAlign:'center' }}>🔒 الحصة {selectedSession} مقفولة!</p>
                  )}
                </div>

                <div className="glass" style={{ padding:18, marginBottom:14 }}>
                  <p style={{ fontWeight:800, marginBottom:12, fontSize:14, color:'var(--text)' }}>اختر الحصة:</p>
                  <div style={{ display:'grid', gridTemplateColumns:'repeat(6,1fr)', gap:7 }}>
                    {Array.from({length:12},(_,i) => (
                      <div key={i} style={{ position:'relative' }}>
                        <button onClick={()=>setSelectedSession(i+1)}
                          className={`sess-pill${selectedSession===i+1?' selected':''}`}
                          style={{ width:'100%', border:'none', cursor:'pointer', fontFamily:'Cairo,sans-serif' }}>
                          <span style={{ fontSize:12, fontWeight:700 }}>ح{i+1}</span>
                        </button>
                        <button onClick={e=>{ e.stopPropagation(); toggleSessionLock(i); }}
                          style={{ position:'absolute', top:-5, right:-5, width:18, height:18, borderRadius:'50%', border:'none', cursor:'pointer', background:lockedSessions[i]?'var(--rose)':'var(--green)', display:'flex', alignItems:'center', justifyContent:'center', boxShadow:'0 2px 6px rgba(0,0,0,.25)' }}>
                          {lockedSessions[i]?<Lock size={9} color="#fff"/>:<Unlock size={9} color="#fff"/>}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <button onClick={startScanner} disabled={lockedSessions[selectedSession-1]} className="btn btn-green btn-xl" style={{ width:'100%', marginBottom:14 }}>
                  <Camera size={22}/> ابدأ Scan
                </button>

                <div className="glass" style={{ padding:16, borderColor:'var(--border-g)' }}>
                  <p style={{ fontWeight:800, color:'var(--gold)', marginBottom:8, fontSize:13 }}>📝 التعليمات:</p>
                  <ol style={{ color:'var(--muted)', fontSize:12, lineHeight:2, paddingRight:16 }}>
                    <li>اختر رقم الحصة</li><li>افتح القفل الأحمر</li><li>اضغط "ابدأ Scan"</li>
                  </ol>
                </div>
              </div>
            )}

            {/* ══ EXAMS ══ */}
            {currentPage === 'exams' && (
              <div className="anim-up">
                <h1 className="page-title" style={{ marginBottom:16 }}>📝 الامتحانات</h1>
                <div style={{ display:'flex', gap:8, marginBottom:16, flexWrap:'wrap' }}>
                  {examConfigs.map(ec => (
                    <button key={ec.type} onClick={()=>setCurrentExam(ec.type)}
                      className="btn" style={{ fontSize:13, padding:'9px 18px', borderRadius:11, fontFamily:'Cairo,sans-serif',
                        background:currentExam===ec.type?ec.color:'var(--inp-bg)',
                        color:currentExam===ec.type?'#fff':'var(--muted)',
                        boxShadow:currentExam===ec.type?`0 3px 16px ${ec.color}44`:'none',
                        border:currentExam===ec.type?'none':'1px solid var(--border)' }}>
                      {ec.title}
                    </button>
                  ))}
                </div>

                <div className="glass" style={{ padding:'12px 14px', marginBottom:12 }}>
                  <div style={{ position:'relative' }}>
                    <Search style={{ position:'absolute', right:12, top:'50%', transform:'translateY(-50%)' }} size={14} color="var(--muted)"/>
                    <input className="inp" type="text" placeholder="ابحث..." value={examSearch} onChange={e=>setExamSearch(e.target.value)} style={{ paddingRight:36 }}/>
                  </div>
                </div>

                <div className="glass" style={{ padding:16 }}>
                  <h2 style={{ fontWeight:900, marginBottom:6, fontSize:15, color:examCfg.color }}>{examCfg.title} (من {examCfg.total})</h2>
                  <p style={{ color:'var(--muted)', fontSize:11, marginBottom:14 }}>
                    {examCfg.type==='monthly'
                      ? 'قبطي/10 + طقس/10 + تسميع/10 = 30 درجة'
                      : 'قبطي/15 + طقس/15 + تسميع/20 = 50 درجة'}
                  </p>
                  <div className="tbl-wrap">
                    <table className="tbl">
                      <thead>
                        <tr>
                          <th>#</th><th>الطالب</th>
                          {examCfg.fields.map(f => (
                            <th key={f.key} style={{ textAlign:'center', whiteSpace:'nowrap' }}>
                              {f.label}{f.max ? `/${f.max}` : ''}
                            </th>
                          ))}
                          <th style={{ textAlign:'center', background:`${examCfg.color}10`, color:examCfg.color }}>المجموع/{examCfg.total}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredExamStudents.map((s,idx) => {
                          const ex = exams[s.id]?.[currentExam] || {};
                          const rawTotal = (ex.coptic||0)+(ex.liturgy||0)+(ex.oral||0);
                          const bonus = ex.bonus||0;
                          return (
                            <tr key={s.id}>
                              <td style={{ color:'var(--muted)', fontWeight:700 }}>{idx+1}</td>
                              <td style={{ fontWeight:700, fontSize:13 }}>{s.name}</td>
                              {examCfg.fields.map(f => (
                                <td key={f.key} style={{ textAlign:'center' }}>
                                  <input type="number" className="score-inp" min="0" max={f.max||999} step="0.5"
                                    value={ex[f.key]||0}
                                    style={{ borderColor: f.key==='bonus' ? '#f59e0b' : examCfg.color, background: f.key==='bonus' ? 'rgba(245,158,11,.04)' : undefined }}
                                    onChange={e => {
                                      const v = parseFloat(e.target.value)||0;
                                      if (f.max && v > f.max) { toast.error(`أقصى درجة ${f.max}`); return; }
                                      updateExamScore(s.id, currentExam, f.key, v);
                                    }}/>
                                </td>
                              ))}
                              <td style={{ textAlign:'center', fontWeight:900, fontSize:16, color:examCfg.color, background:`${examCfg.color}08` }}>
                                {(rawTotal+bonus).toFixed(1)}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* ══ STUDENT CHECK (Admin) ══ */}
            {currentPage === 'student-check' && (
              <div className="anim-up" style={{ maxWidth:640, margin:'0 auto' }}>
                <h1 className="page-title" style={{ textAlign:'center', marginBottom:18 }}>🔍 استعلام عن طالب</h1>

                <div className="glass2" style={{ padding:22, marginBottom:16 }}>
                  <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:14 }}>
                    <div style={{ width:42, height:42, borderRadius:12, background:'linear-gradient(135deg,var(--violet),var(--gold))', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                      <Key size={20} color="#fff"/>
                    </div>
                    <div>
                      <h2 style={{ fontWeight:900, fontSize:16, color:'var(--text)' }}>أدخل كود الطالب</h2>
                      <p style={{ color:'var(--muted)', fontSize:12 }}>للبحث عن نتيجة أي طالب</p>
                    </div>
                  </div>
                  <div style={{ display:'flex', gap:8 }}>
                    <input className="inp" type="text" placeholder="TEN-XXXXXX" value={studentCode}
                      onChange={e=>{ setStudentCode(e.target.value.toUpperCase()); setResultError(''); }}
                      onKeyPress={e=>{ if(e.key==='Enter'&&studentCode.trim()) searchStudentByCodeAdmin(); }}
                      style={{ fontFamily:'monospace', fontSize:17, fontWeight:700, letterSpacing:3, textAlign:'center' }}/>
                    <button onClick={searchStudentByCodeAdmin} disabled={!studentCode.trim()} className="btn btn-gold" style={{ flexShrink:0 }}><Search size={16}/></button>
                    <button onClick={startScanner} className="btn btn-violet" style={{ flexShrink:0 }}><Camera size={16}/></button>
                  </div>
                  {resultError && (
                    <div style={{ marginTop:10, background:'rgba(244,63,94,.06)', border:'1px solid rgba(244,63,94,.2)', borderRadius:9, padding:'10px 14px', textAlign:'center' }}>
                      <p style={{ color:'var(--rose)', fontWeight:700, fontSize:13 }}>{resultError}</p>
                    </div>
                  )}
                </div>

                {!studentResult && (
                  <div className="glass" style={{ padding:18 }}>
                    <div style={{ position:'relative', marginBottom:12 }}>
                      <Search style={{ position:'absolute', right:12, top:'50%', transform:'translateY(-50%)' }} size={14} color="var(--muted)"/>
                      <input className="inp" type="text" placeholder="ابحث بالاسم..." value={searchTerm} onChange={e=>setSearchTerm(e.target.value)} style={{ paddingRight:36 }}/>
                    </div>
                    <div style={{ display:'flex', flexDirection:'column', gap:7, maxHeight:380, overflowY:'auto' }}>
                      {filteredStudents.map(s => (
                        <button key={s.id}
                          onClick={()=>{ setStudentCode(s.student_code||''); setResultError(''); setTimeout(()=>searchStudentByCodeAdmin(),100); }}
                          style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'11px 14px', background:'var(--inp-bg)', border:'1px solid var(--border)', borderRadius:11, cursor:'pointer', transition:'all .16s', textAlign:'right', fontFamily:'Cairo,sans-serif' }}
                          onMouseEnter={e=>e.currentTarget.style.borderColor='var(--gold)'} onMouseLeave={e=>e.currentTarget.style.borderColor='var(--border)'}>
                          <div style={{ display:'flex', alignItems:'center', gap:10 }}>
                            <div style={{ width:32, height:32, borderRadius:9, background:`linear-gradient(135deg,var(--gold-glow),rgba(139,92,246,.12))`, display:'flex', alignItems:'center', justifyContent:'center', fontWeight:900, color:'var(--gold)', fontSize:13, flexShrink:0 }}>
                              {s.name.charAt(0)}
                            </div>
                            <div>
                              <p style={{ fontWeight:700, fontSize:13, color:'var(--text)' }}>{s.name}</p>
                              <p style={{ fontSize:10, color:'var(--muted)' }}>سنة {s.age||'-'}</p>
                            </div>
                          </div>
                          <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                            <span style={{ fontFamily:'monospace', fontSize:10, color:'var(--violet)', background:'rgba(139,92,246,.08)', padding:'2px 7px', borderRadius:5 }}>{s.student_code||'-'}</span>
                            <span style={{ fontWeight:900, fontSize:18, color:'var(--gold)' }}>{calcTotal(s.id)}</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {studentResult && (
                  <div className="glass2 anim-up" style={{ padding:22 }}>
                    <div style={{ background:`linear-gradient(135deg,var(--gold-glow),rgba(139,92,246,.08))`, borderRadius:14, padding:'20px 16px', textAlign:'center', marginBottom:18, border:'1px solid var(--border-g)' }}>
                      <div style={{ fontSize:44, marginBottom:6 }}>🎓</div>
                      <h2 style={{ fontSize:20, fontWeight:900, marginBottom:3, color:'var(--text)' }}>{studentResult.name}</h2>
                      <p style={{ color:'var(--muted)', fontSize:12 }}>السن: سنة {studentResult.age||'-'}</p>
                    </div>
                    <div style={{ display:'flex', flexDirection:'column', gap:8, marginBottom:14 }}>
                      {[
                        { label:'درجة الحضور', val:`${studentResult.attendance} / 30`, color:'var(--teal)', detail:null },
                        { label:'امتحان الشهر', val:`${studentResult.monthly.total} / 30`, color:'#3b82f6', detail:`قبطي: ${studentResult.monthly.coptic} | طقس: ${studentResult.monthly.liturgy} | تسميع: ${studentResult.monthly.oral} | بونص: ${studentResult.monthly.bonus}` },
                        { label:'الامتحان النهائي', val:`${studentResult.final.total} / 50`, color:'var(--rose)', detail:`قبطي: ${studentResult.final.coptic} | طقس: ${studentResult.final.liturgy} | تسميع: ${studentResult.final.oral} | بونص: ${studentResult.final.bonus}` },
                      ].map((row,i) => (
                        <div key={i} style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'12px 14px', background:'var(--inp-bg)', border:'1px solid var(--border)', borderRadius:11 }}>
                          <div>
                            <p style={{ fontWeight:700, fontSize:13, color:'var(--text)' }}>{row.label}</p>
                            {row.detail && <p style={{ color:'var(--muted)', fontSize:10, marginTop:2 }}>{row.detail}</p>}
                          </div>
                          <span style={{ fontSize:17, fontWeight:900, color:row.color, flexShrink:0, marginRight:10 }}>{row.val}</span>
                        </div>
                      ))}
                    </div>
                    <div className="anim-glow" style={{ background:`linear-gradient(135deg,var(--gold-glow),rgba(245,158,11,.06))`, border:'2px solid var(--border-g)', borderRadius:14, padding:'18px 16px', textAlign:'center', marginBottom:14 }}>
                      <p style={{ color:'var(--muted)', marginBottom:3, fontSize:12 }}>المجموع الكلي</p>
                      <p style={{ fontSize:50, fontWeight:900, color:'var(--gold)', lineHeight:1 }}>{studentResult.total}</p>
                      <p style={{ color:'var(--muted)', fontSize:12, marginBottom:6 }}>من 100 درجة</p>
                      <span style={{ fontSize:22, fontWeight:900, color:studentResult.grade.color }}>{studentResult.grade.text}</span>
                    </div>
                    <button onClick={()=>{ setStudentCode(''); setStudentResult(null); setResultError(''); setSearchTerm(''); }} className="btn btn-violet btn-lg" style={{ width:'100%' }}>
                      🔍 بحث عن طالب آخر
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* ══ RESULTS ══ */}
            {currentPage === 'results' && (
              <div className="anim-up">
                <div className="page-header">
                  <h1 className="page-title">🏆 النتائج النهائية</h1>
                  <div style={{ display:'flex', gap:7 }}>
                    <button onClick={exportToCSV} className="btn btn-green btn-sm"><Download size={14}/> CSV</button>
                    <button onClick={exportToGoogleSheets} className="btn btn-violet btn-sm"><Download size={14}/> Sheets</button>
                  </div>
                </div>

                <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:10, marginBottom:20 }}>
                  {[
                    { label:'الناجحين', val:students.filter(s=>parseFloat(calcTotal(s.id))>=50).length, color:'var(--green)' },
                    { label:'الراسبين', val:students.filter(s=>parseFloat(calcTotal(s.id))<50).length, color:'var(--rose)' },
                    { label:'أعلى درجة', val:students.length>0?Math.max(...students.map(s=>parseFloat(calcTotal(s.id)))).toFixed(1):0, color:'var(--gold)' },
                    { label:'المتوسط', val:students.length>0?(students.reduce((s,st)=>s+parseFloat(calcTotal(st.id)),0)/students.length).toFixed(1):0, color:'var(--violet)' },
                  ].map((c,i) => (
                    <div key={i} className="glass" style={{ padding:'14px 12px', textAlign:'center', background:`${c.color}08`, borderColor:`${c.color}22` }}>
                      <p style={{ color:'var(--muted)', fontSize:10, marginBottom:5 }}>{c.label}</p>
                      <p style={{ fontSize:26, fontWeight:900, color:c.color, lineHeight:1 }}>{c.val}</p>
                    </div>
                  ))}
                </div>

                <div className="glass" style={{ padding:16 }}>
                  <div className="tbl-wrap">
                    <table className="tbl">
                      <thead>
                        <tr>
                          <th>#</th><th>الطالب</th>
                          <th style={{ textAlign:'center' }}>الكود</th>
                          <th style={{ textAlign:'center' }}>السن</th>
                          <th style={{ textAlign:'center' }}>حضور</th>
                          <th style={{ textAlign:'center' }}>الشهر</th>
                          <th style={{ textAlign:'center' }}>الفاينال</th>
                          <th style={{ textAlign:'center', background:'rgba(184,134,11,.06)', color:'var(--gold)' }}>المجموع</th>
                          <th style={{ textAlign:'center', background:'rgba(109,40,217,.06)', color:'var(--violet)' }}>التقدير</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[...students].sort((a,b)=>parseFloat(calcTotal(b.id))-parseFloat(calcTotal(a.id))).map((s,i) => {
                          const as=calcAtt(s.id);
                          const mR=((exams[s.id]?.monthly?.coptic||0)+(exams[s.id]?.monthly?.liturgy||0)+(exams[s.id]?.monthly?.oral||0));
                          const fR=((exams[s.id]?.final?.coptic||0)+(exams[s.id]?.final?.liturgy||0)+(exams[s.id]?.final?.oral||0));
                          const tot=calcTotal(s.id); const gr=getGrade(parseFloat(tot));
                          return (
                            <tr key={s.id}>
                              <td style={{ fontWeight:800, color:'var(--muted)' }}>{i+1}</td>
                              <td style={{ fontWeight:700, fontSize:13 }}>{s.name}</td>
                              <td style={{ textAlign:'center' }}><span className="badge badge-violet" style={{ fontFamily:'monospace', fontSize:9 }}>{s.student_code||'-'}</span></td>
                              <td style={{ textAlign:'center', color:'var(--muted)', fontSize:12 }}>{s.age||'-'}</td>
                              <td style={{ textAlign:'center', fontWeight:700, color:'var(--teal)', fontSize:12 }}>{as}</td>
                              <td style={{ textAlign:'center', fontWeight:700, color:'#3b82f6', fontSize:12 }}>{mR.toFixed(1)}</td>
                              <td style={{ textAlign:'center', fontWeight:700, color:'var(--rose)', fontSize:12 }}>{fR.toFixed(1)}</td>
                              <td style={{ textAlign:'center', fontWeight:900, fontSize:19, color:'var(--gold)', background:'var(--gold-glow)' }}>{tot}</td>
                              <td style={{ textAlign:'center', fontWeight:900, fontSize:13, color:gr.color, background:'rgba(109,40,217,.04)' }}>{gr.text}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}


            {/* ══ CHANTS ADMIN ══ */}
            {currentPage === 'lessons' && (
              <div className="anim-up">
                <div className="page-header">
                  <h1 className="page-title">🎵 إدارة الألحان</h1>
                  <button onClick={() => {
                    setEditingChant(null);
                    setChantForm({ name: '', drive_url: '', notes: '', order_num: 0, is_published: true });
                  }} className="btn btn-gold btn-sm"><Plus size={14}/> لحن جديد</button>
                </div>

                {/* Form */}
                <div className="glass2" style={{ padding:20, marginBottom:18 }}>
                  <h3 style={{ fontWeight:800, fontSize:15, color:'var(--gold)', marginBottom:16 }}>
                    {editingChant ? '✏️ تعديل لحن' : '✨ إضافة لحن جديد'}
                  </h3>

                  {/* اسم اللحن */}
                  <div style={{ marginBottom:10 }}>
                    <label style={{ display:'block', fontSize:11, fontWeight:700, color:'var(--muted)', marginBottom:5 }}>اسم اللحن *</label>
                    <input className="inp" type="text" placeholder="مثال: كيري إيليسون" value={chantForm.name} onChange={e => setChantForm({...chantForm, name: e.target.value})}/>
                  </div>

                  {/* رابط Drive */}
                  <div style={{ marginBottom:10 }}>
                    <label style={{ display:'flex', alignItems:'center', gap:6, fontSize:11, fontWeight:700, color:'var(--muted)', marginBottom:5 }}>
                      <span>🎵</span> رابط الصوت (Google Drive) *
                    </label>
                    <input className="inp" type="text" placeholder="https://drive.google.com/file/d/..." value={chantForm.drive_url} onChange={e => setChantForm({...chantForm, drive_url: e.target.value})}/>
                  </div>

                  {/* ملاحظات */}
                  <div style={{ marginBottom:10 }}>
                    <label style={{ display:'block', fontSize:11, fontWeight:700, color:'var(--muted)', marginBottom:5 }}>ملاحظات (اختياري)</label>
                    <input className="inp" type="text" placeholder="مثال: من قداس الأحد" value={chantForm.notes} onChange={e => setChantForm({...chantForm, notes: e.target.value})}/>
                  </div>

                  {/* ترتيب */}
                  <div style={{ marginBottom:14 }}>
                    <label style={{ display:'block', fontSize:11, fontWeight:700, color:'var(--muted)', marginBottom:5 }}>الترتيب (الأصغر يظهر أول)</label>
                    <input className="inp" type="number" placeholder="0" value={chantForm.order_num} onChange={e => setChantForm({...chantForm, order_num: e.target.value})} style={{ width:100 }}/>
                  </div>

                  {/* Drive tip */}
                  <div style={{ background:'rgba(13,148,136,.07)', border:'1px solid rgba(13,148,136,.2)', borderRadius:10, padding:'10px 14px', marginBottom:14 }}>
                    <p style={{ color:'var(--teal)', fontWeight:700, fontSize:12, marginBottom:4 }}>💡 إزاي تجيب رابط Drive؟</p>
                    <p style={{ color:'var(--muted)', fontSize:11, lineHeight:1.7 }}>
                      افتح الملف الصوتي في Drive ← Share ← Anyone with the link ← Copy link
                    </p>
                  </div>

                  {/* منشور */}
                  <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:16, padding:'10px 14px', background:'var(--inp-bg)', border:'1px solid var(--border)', borderRadius:11 }}>
                    <input type="checkbox" id="chant-pub" checked={chantForm.is_published} onChange={e => setChantForm({...chantForm, is_published: e.target.checked})} style={{ width:18, height:18, cursor:'pointer', accentColor:'var(--green)' }}/>
                    <label htmlFor="chant-pub" style={{ fontWeight:700, fontSize:13, color:'var(--text)', cursor:'pointer' }}>
                      {chantForm.is_published ? '✅ منشور للطلاب' : '🔒 مخفي (مسودة)'}
                    </label>
                  </div>

                  <div style={{ display:'flex', gap:8 }}>
                    <button onClick={saveChant} className="btn btn-green"><Save size={15}/> {editingChant ? 'تحديث' : 'حفظ اللحن'}</button>
                    {editingChant && (
                      <button onClick={() => { setEditingChant(null); setChantForm({ name:'', drive_url:'', notes:'', order_num:0, is_published:true }); }} className="btn btn-ghost">إلغاء</button>
                    )}
                  </div>
                </div>

                {/* قائمة الألحان */}
                <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
                  {chants.length === 0 ? (
                    <div className="glass" style={{ textAlign:'center', padding:'40px 20px' }}>
                      <div style={{ fontSize:44, marginBottom:12 }}>📭</div>
                      <p style={{ fontWeight:700, color:'var(--muted)' }}>لسه مفيش ألحان. ابدأ بإضافة لحن!</p>
                    </div>
                  ) : chants.map(chant => (
                    <div key={chant.id} className="glass" style={{ padding:'16px 18px' }}>
                      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', gap:10 }}>
                        <div style={{ display:'flex', alignItems:'center', gap:12, flex:1, minWidth:0 }}>
                          <div style={{ width:40, height:40, borderRadius:11, background:'linear-gradient(135deg,rgba(139,92,246,.15),var(--gold-glow))', border:'1px solid var(--border-g)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                            <span style={{ fontSize:18 }}>🎵</span>
                          </div>
                          <div style={{ minWidth:0 }}>
                            <div style={{ display:'flex', alignItems:'center', gap:7, marginBottom:3 }}>
                              <p style={{ fontWeight:800, fontSize:14, color:'var(--text)' }}>{chant.name}</p>
                              <span style={{ fontSize:10, fontWeight:700, padding:'2px 8px', borderRadius:6,
                                background: chant.is_published ? 'rgba(16,185,129,.1)' : 'rgba(244,63,94,.1)',
                                color: chant.is_published ? 'var(--green)' : 'var(--rose)',
                                border: `1px solid ${chant.is_published ? 'rgba(16,185,129,.25)' : 'rgba(244,63,94,.25)'}` }}>
                                {chant.is_published ? 'منشور' : 'مسودة'}
                              </span>
                            </div>
                            {chant.notes && <p style={{ fontSize:11, color:'var(--muted)' }}>{chant.notes}</p>}
                          </div>
                        </div>
                        <div style={{ display:'flex', gap:6, flexShrink:0 }}>
                          <button onClick={() => startEditChant(chant)} className="btn btn-teal btn-sm"><Edit2 size={13}/></button>
                          <button onClick={() => deleteChant(chant.id)} className="btn btn-rose btn-sm"><Trash2 size={13}/></button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </main>
        </div>
      </div>
    </>
  );
};

export default App;
