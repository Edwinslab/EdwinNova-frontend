"use client";
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import {
  Plus, Trash2, Github, Mail, Phone,
  User, Briefcase, Upload, ChevronDown, Globe, ArrowLeft
} from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import Link from "next/link";

interface Teammate {
  name: string;
  email: string;
  role: "Developer" | "Designer" | "";
  github: string;
  resume: File | null;
  portfolio: string;
}

interface FormState {
  team_name: string;
  pm_name: string;
  pm_email: string;
  pm_contact: string;
  alternate_number: string;
  domain: string;
  teammates: Teammate[];
}


const isValidEmail = (v: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());

// Stronger phone validation:
// - strips spaces, dashes, dots, parentheses
// - optional leading +
// - must be 10–15 digits only (no letters, no special chars)
const isValidPhone = (v: string) => {
  const cleaned = v.trim().replace(/[\s\-().]/g, "");
  return /^\+?\d{10,15}$/.test(cleaned);
};

const isValidUrl = (v: string) => {
  try { new URL(v.trim()); return true; } catch { return false; }
};

const DOMAINS = [
  "Wildcard (Open Theme) ",
  "Root Code (AgriTech) ",
  "TideHack (Costal or Fishing)"
];

const EMPTY_TEAMMATE: Teammate = {
  name: "", email: "", role: "", github: "", resume: null, portfolio: "",
};

const inputBase: React.CSSProperties = {
  width: "100%",
  background: "rgba(255,255,255,0.03)",
  border: "1px solid rgba(155,233,49,0.15)",
  borderRadius: 10,
  padding: "13px 16px 13px 44px",
  color: "#E6EDF3",
  fontFamily: "'DM Sans', sans-serif",
  fontSize: 14,
  outline: "none",
  transition: "border-color 0.25s, box-shadow 0.25s",
};


function BackToHome() {
  return (
    <motion.div
      style={{ position: "fixed", top: 28, left: 28, zIndex: 50 }}
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.2, duration: 0.5 }}
    >
      <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 10 }}>
        <motion.div
          style={{
            width: 36,
            height: 36,
            borderRadius: "50%",
            background: "rgba(155,233,49,0.06)",
            border: "1px solid rgba(155,233,49,0.15)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            transition: "background 0.25s, border-color 0.25s, box-shadow 0.25s",
          }}
          whileHover={{
            background: "rgba(155,233,49,0.15)",
            borderColor: "rgba(155,233,49,0.4)",
            boxShadow: "0 0 16px rgba(155,233,49,0.12)",
            x: -2,
          }}
          whileTap={{ scale: 0.92 }}
        >
          <ArrowLeft size={16} style={{ color: "#9BE931" }} />
        </motion.div>
        <span
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: 11,
            letterSpacing: "0.25em",
            textTransform: "uppercase" as const,
            color: "rgba(155,233,49,0.35)",
            transition: "color 0.25s",
          }}
        >
          Home
        </span>
      </Link>
    </motion.div>
  );
}


function Field({
  icon, placeholder, value, onChange, type = "text",
}: {
  icon: React.ReactNode;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
}) {
  const [focused, setFocused] = useState(false);
  return (
    <div style={{ position: "relative" }}>
      <span style={{
        position: "absolute", left: 14, top: "50%",
        transform: "translateY(-50%)",
        color: focused ? "#9BE931" : "rgba(230,237,243,0.25)",
        transition: "color 0.25s", pointerEvents: "none",
        display: "flex", alignItems: "center",
      }}>
        {icon}
      </span>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          ...inputBase,
          borderColor: focused ? "rgba(155,233,49,0.5)" : "rgba(155,233,49,0.15)",
          boxShadow: focused
            ? "0 0 0 3px rgba(155,233,49,0.06), inset 0 0 20px rgba(155,233,49,0.02)"
            : "none",
        }}
      />
    </div>
  );
}

function DomainSelect({ value, onChange }: {
  value: string;
  onChange: (v: string) => void;
}) {
  const [focused, setFocused] = useState(false);
  return (
    <div style={{ position: "relative" }}>
      <span style={{
        position: "absolute", left: 14, top: "50%",
        transform: "translateY(-50%)",
        color: focused ? "#9BE931" : "rgba(230,237,243,0.25)",
        transition: "color 0.25s", pointerEvents: "none",
      }}>
        <Briefcase size={15} />
      </span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          ...inputBase,
          appearance: "none",
          cursor: "pointer",
          borderColor: focused ? "rgba(155,233,49,0.5)" : "rgba(155,233,49,0.15)",
          boxShadow: focused ? "0 0 0 3px rgba(155,233,49,0.06)" : "none",
        }}
      >
        <option value="" disabled hidden style={{ background: "#111620" }}>
          Select Domain / Track
        </option>
        {DOMAINS.map((d) => (
          <option key={d} value={d} style={{ background: "#111620", color: "#E6EDF3" }}>
            {d}
          </option>
        ))}
      </select>
      <ChevronDown size={15} style={{
        position: "absolute", right: 14, top: "50%",
        transform: focused ? "translateY(-50%) rotate(180deg)" : "translateY(-50%)",
        color: focused ? "#9BE931" : "rgba(230,237,243,0.25)",
        pointerEvents: "none",
        transition: "transform 0.2s, color 0.25s",
      }} />
    </div>
  );
}

function RoleSelect({ value, onChange }: {
  value: string;
  onChange: (v: "Developer" | "Designer") => void;
}) {
  const [focused, setFocused] = useState(false);
  return (
    <div style={{ position: "relative" }}>
      <span style={{
        position: "absolute", left: 14, top: "50%",
        transform: "translateY(-50%)",
        color: focused ? "#9BE931" : "rgba(230,237,243,0.25)",
        transition: "color 0.25s", pointerEvents: "none",
      }}>
        <Briefcase size={15} />
      </span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as "Developer" | "Designer")}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          ...inputBase,
          appearance: "none",
          cursor: "pointer",
          borderColor: focused ? "rgba(155,233,49,0.5)" : "rgba(155,233,49,0.15)",
          boxShadow: focused ? "0 0 0 3px rgba(155,233,49,0.06)" : "none",
        }}
      >
        <option value="" disabled hidden style={{ background: "#111620" }}>
          Select Role
        </option>
        <option value="Developer" style={{ background: "#111620", color: "#E6EDF3" }}>
          Developer
        </option>
        <option value="Designer" style={{ background: "#111620", color: "#E6EDF3" }}>
          Designer
        </option>
      </select>
      <ChevronDown size={15} style={{
        position: "absolute", right: 14, top: "50%",
        transform: focused ? "translateY(-50%) rotate(180deg)" : "translateY(-50%)",
        color: focused ? "#9BE931" : "rgba(230,237,243,0.25)",
        pointerEvents: "none",
        transition: "transform 0.2s, color 0.25s",
      }} />
    </div>
  );
}

function ResumeZone({ file, onFile }: {
  file: File | null;
  onFile: (f: File) => void;
}) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { "application/pdf": [".pdf"] },
    maxFiles: 1,
    onDrop: (accepted, rejected) => {
      if (rejected.length > 0) {
        toast.error("Resume must be a PDF file under 5MB.");
        return;
      }
      if (accepted[0]) {
        if (accepted[0].size > 5 * 1024 * 1024) {
          toast.error("Resume file exceeds 5MB limit.");
          return;
        }
        onFile(accepted[0]);
      }
    },
  });
  return (
    <div
      {...getRootProps()}
      style={{
        border: `1px dashed ${isDragActive ? "#9BE931" : file ? "rgba(155,233,49,0.5)" : "rgba(155,233,49,0.2)"}`,
        borderRadius: 10,
        padding: "13px 16px",
        display: "flex",
        alignItems: "center",
        gap: 10,
        cursor: "pointer",
        background: isDragActive ? "rgba(155,233,49,0.05)" : "rgba(255,255,255,0.02)",
        transition: "all 0.25s",
        boxShadow: isDragActive ? "0 0 16px rgba(155,233,49,0.15)" : "none",
      }}
    >
      <input {...getInputProps()} />
      <Upload size={15} style={{ color: file ? "#9BE931" : "rgba(230,237,243,0.25)", flexShrink: 0 }} />
      <span style={{
        fontFamily: "'Space Mono',monospace",
        fontSize: 11,
        color: file ? "#9BE931" : "rgba(230,237,243,0.3)",
        letterSpacing: "0.05em",
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
      }}>
        {file ? file.name : "Upload Resume PDF · Max 5MB"}
      </span>
    </div>
  );
}

function ProposalZone({ file, onFile }: {
  file: File | null;
  onFile: (f: File) => void;
}) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { "application/pdf": [".pdf"] },
    maxFiles: 1,
    onDrop: (accepted, rejected) => {
      if (rejected.length > 0) {
        toast.error("Proposal must be a PDF file under 10MB.");
        return;
      }
      if (accepted[0]) {
        if (accepted[0].size > 10 * 1024 * 1024) {
          toast.error("Proposal file exceeds 10MB limit.");
          return;
        }
        onFile(accepted[0]);
      }
    },
  });
  return (
    <div
      {...getRootProps()}
      style={{
        border: `2px dashed ${isDragActive ? "#9BE931" : file ? "rgba(155,233,49,0.6)" : "rgba(155,233,49,0.22)"}`,
        borderRadius: 16,
        padding: "52px 32px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 16,
        cursor: "pointer",
        textAlign: "center",
        background: isDragActive ? "rgba(155,233,49,0.04)" : "rgba(155,233,49,0.01)",
        transition: "all 0.3s",
        boxShadow: isDragActive
          ? "0 0 40px rgba(155,233,49,0.12), inset 0 0 40px rgba(155,233,49,0.03)"
          : file ? "0 0 24px rgba(155,233,49,0.08)" : "none",
      }}
    >
      <input {...getInputProps()} />
      <div style={{
        width: 60, height: 60, borderRadius: "50%",
        background: "rgba(155,233,49,0.07)",
        border: "1px solid rgba(155,233,49,0.18)",
        display: "flex", alignItems: "center", justifyContent: "center",
        boxShadow: file ? "0 0 24px rgba(155,233,49,0.2)" : "none",
        transition: "all 0.3s",
      }}>
        <Upload size={24} style={{ color: file ? "#9BE931" : "rgba(155,233,49,0.45)" }} />
      </div>
      {file ? (
        <>
          <p style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: 16, color: "#9BE931" }}>
            {file.name}
          </p>
          <p style={{ fontFamily: "'Space Mono',monospace", fontSize: 10, color: "rgba(155,233,49,0.45)", letterSpacing: "0.15em" }}>
            PDF UPLOADED — CLICK TO REPLACE
          </p>
        </>
      ) : (
        <>
          <p style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: 17, color: "#E6EDF3" }}>
            {isDragActive ? "Drop it here" : "Drag & Drop Proposal PDF"}
          </p>
          <p style={{ fontFamily: "'Space Mono',monospace", fontSize: 10, color: "rgba(230,237,243,0.25)", letterSpacing: "0.15em" }}>
            OR CLICK TO BROWSE · PDF ONLY · MAX 10MB
          </p>
        </>
      )}
    </div>
  );
}


function SectionLabel({ num, label }: { num: string; label: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 20 }}>
      <span style={{
        fontFamily: "'Space Mono',monospace", fontSize: 10, color: "#9BE931",
        background: "rgba(155,233,49,0.08)", border: "1px solid rgba(155,233,49,0.2)",
        borderRadius: 6, padding: "3px 10px", letterSpacing: "0.1em", flexShrink: 0,
      }}>
        {num}
      </span>
      <span style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: 18, color: "#E6EDF3" }}>
        {label}
      </span>
      <div style={{ flex: 1, height: 1, background: "linear-gradient(to right, rgba(155,233,49,0.12), transparent)" }} />
    </div>
  );
}

function GlassCard({ children, style }: {
  children: React.ReactNode;
  style?: React.CSSProperties;
}) {
  return (
    <div style={{
      background: "rgba(255,255,255,0.025)",
      backdropFilter: "blur(12px)",
      border: "1px solid rgba(155,233,49,0.09)",
      borderRadius: 16,
      padding: "28px",
      ...style,
    }}>
      {children}
    </div>
  );
}

function RoleBadge({ role }: { role: "Developer" | "Designer" | "" }) {
  if (!role) return null;
  const isDev = role === "Developer";
  return (
    <span style={{
      fontFamily: "'Space Mono',monospace",
      fontSize: 10,
      letterSpacing: "0.12em",
      padding: "3px 10px",
      borderRadius: 100,
      background: isDev ? "rgba(155,233,49,0.08)" : "rgba(120,80,255,0.1)",
      border: `1px solid ${isDev ? "rgba(155,233,49,0.25)" : "rgba(120,80,255,0.25)"}`,
      color: isDev ? "#9BE931" : "#a78bfa",
    }}>
      {isDev ? "// DEV" : "// DESIGN"}
    </span>
  );
}

export default function ApplyForm() {
  const [form, setForm] = useState<FormState>({
    team_name: "",
    pm_name: "",
    pm_email: "",
    pm_contact: "",
    alternate_number: "",
    domain: "",
    teammates: [{ ...EMPTY_TEAMMATE }],
  });
  const [proposal, setProposal] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);


  const updateField = (field: keyof FormState, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const updateTeammate = (i: number, field: keyof Teammate, value: string | File) => {
    setForm((prev) => {
      const updated = [...prev.teammates];
      if (field === "role") {
        updated[i] = {
          ...updated[i],
          role: value as "Developer" | "Designer",
          github: "",
          portfolio: "",
        };
      } else {
        (updated[i] as any)[field] = value;
      }
      return { ...prev, teammates: updated };
    });
  };

  const addTeammate = () => {
    if (form.teammates.length >= 4) return;
    setForm((prev) => ({
      ...prev,
      teammates: [...prev.teammates, { ...EMPTY_TEAMMATE }],
    }));
  };

  const removeTeammate = (i: number) => {
    if (form.teammates.length <= 1) return;
    setForm((prev) => ({
      ...prev,
      teammates: prev.teammates.filter((_, idx) => idx !== i),
    }));
  };

  const validate = (): boolean => {

    // Proposal
    if (!proposal) {
      toast.error("Project proposal PDF is required.");
      return false;
    }

    // Team info
    if (!form.team_name.trim()) {
      toast.error("Team name is required.");
      return false;
    }
    if (!form.domain) {
      toast.error("Please select a domain / track.");
      return false;
    }

    // Project manager
    if (!form.pm_name.trim()) {
      toast.error("Project Manager name is required.");
      return false;
    }
    if (!form.pm_email.trim()) {
      toast.error("Project Manager email is required.");
      return false;
    }
    if (!isValidEmail(form.pm_email)) {
      toast.error("Project Manager email is not valid.");
      return false;
    }
    if (!form.pm_contact.trim()) {
      toast.error("Project Manager phone number is required.");
      return false;
    }
    if (!isValidPhone(form.pm_contact)) {
      toast.error("Project Manager phone number is not valid.");
      return false;
    }
    if (form.alternate_number.trim() && !isValidPhone(form.alternate_number)) {
      toast.error("Alternate number is not valid.");
      return false;
    }

    // Team members — at least 1 member with name + email is required
    // Additional members are optional, but if added (name or email filled), both must be valid

    // First member is always required
    const firstMember = form.teammates[0];
    if (!firstMember.name.trim()) {
      toast.error("Member 1: Name is required.");
      return false;
    }
    if (!firstMember.email.trim()) {
      toast.error("Member 1: Email is required.");
      return false;
    }
    if (!isValidEmail(firstMember.email)) {
      toast.error("Member 1: Email is not valid.");
      return false;
    }

    // For members 2–4: only validate if name or email is filled (partial fill = error)
    for (let i = 1; i < form.teammates.length; i++) {
      const m = form.teammates[i];
      const hasName = m.name.trim() !== "";
      const hasEmail = m.email.trim() !== "";

      // If either field is filled, both must be filled and valid
      if (hasName || hasEmail) {
        if (!hasName) {
          toast.error(`Member ${i + 1}: Name is required if email is provided.`);
          return false;
        }
        if (!hasEmail) {
          toast.error(`${m.name.trim()}: Email is required if name is provided.`);
          return false;
        }
        if (!isValidEmail(m.email)) {
          toast.error(`${m.name.trim()}: Email is not valid.`);
          return false;
        }
      }
    }

    // Duplicate teammate emails (only among filled ones)
    const emails = form.teammates
      .map((m) => m.email.trim().toLowerCase())
      .filter(Boolean);
    if (emails.length !== new Set(emails).size) {
      toast.error("Duplicate teammate emails are not allowed.");
      return false;
    }

    // COMMENTED OUT: Role validation
    // if (!m.role) {
    //   toast.error(`${label}: Please select a role.`);
    //   return false;
    // }

    // COMMENTED OUT: Resume required for ALL members
    // if (!m.resume) {
    //   toast.error(`${label}: Resume PDF is required.`);
    //   return false;
    // }

    return true;
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;
    if (!validate()) return;

    setLoading(true);
    const loadingToast = toast.loading("Submitting your application...");

    try {
      const fd = new FormData();
      fd.append("payload", JSON.stringify({
        team_name: form.team_name.trim(),
        pm_name: form.pm_name.trim(),
        pm_email: form.pm_email.trim(),
        pm_contact: form.pm_contact.trim(),
        alternate_number: form.alternate_number.trim() || "",
        domain: form.domain,
        teammates: form.teammates.map(({ resume: _, ...t }) => ({
          name: t.name.trim(),
          email: t.email.trim(),
        })),
      }));

      if (proposal) fd.append("proposal", proposal);
      form.teammates.forEach((m) => {
        if (m.resume) fd.append("resumes", m.resume);
      });

      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 30000);

      const response = await fetch(
        "https://edwinnova-server-production.up.railway.app/applications",
        { method: "POST", body: fd, signal: controller.signal }
      );

      clearTimeout(timeout);

      //lorem

      let data: any = null;
      try { data = await response.json(); } catch { data = null; }

      if (!response.ok) {
        const serverMsg = data?.error || data?.message || "Submission failed. Please try again.";
        toast.error(serverMsg, { id: loadingToast });
        return;
      }

      const successMsg = data?.message || "Application submitted successfully!";
      toast.success(successMsg, { id: loadingToast });

      setForm({
        team_name: "", pm_name: "", pm_email: "",
        pm_contact: "", alternate_number: "", domain: "",
        teammates: [{ ...EMPTY_TEAMMATE }],
      });
      setProposal(null);
      setSubmitted(true);

    } catch (err: any) {
      if (err?.name === "AbortError") {
        toast.error("Request timed out. Please try again.", { id: loadingToast });
      } else {
        toast.error("Network error. Please check your connection and try again.", { id: loadingToast });
      }
    } finally {
      setLoading(false);
    }
  };



if (submitted) return (
  <div
    style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: 40,
      background: "#0B0F1A",
      position: "relative",
      overflow: "hidden",
    }}
  >
    {/* Back to Home */}
    <BackToHome />

    {/* Background radial glow */}
    <div
      style={{
        position: "absolute",
        width: 700,
        height: 700,
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(155,233,49,0.06) 0%, transparent 60%)",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        pointerEvents: "none",
      }}
    />

    {/* Horizontal wipe line */}
    <motion.div
      style={{
        position: "absolute",
        height: 1,
        top: "50%",
        left: 0,
        right: 0,
        background: "linear-gradient(90deg, transparent, rgba(155,233,49,0.2) 30%, rgba(155,233,49,0.2) 70%, transparent)",
        transformOrigin: "center",
      }}
      initial={{ scaleX: 0, opacity: 0 }}
      animate={{ scaleX: 1, opacity: 1 }}
      transition={{ delay: 0.1, duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
    />

    {/* Content */}
    <div
      style={{
        position: "relative",
        zIndex: 10,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      {/* Status indicator */}
      <motion.div
        style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 40 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <motion.div
          style={{
            width: 8,
            height: 8,
            borderRadius: "50%",
            background: "#9BE931",
          }}
          animate={{
            boxShadow: [
              "0 0 0px rgba(155,233,49,0.4)",
              "0 0 16px rgba(155,233,49,0.6)",
              "0 0 0px rgba(155,233,49,0.4)",
            ],
          }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
        <span
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: 12,
            letterSpacing: "0.3em",
            color: "#9BE931",
            textTransform: "uppercase",
          }}
        >
          STATUS: RECEIVED
        </span>
      </motion.div>

      {/* Line 1 */}
      <div style={{ overflow: "hidden" }}>
        <motion.h1
          style={{
            fontFamily: "'Syne', sans-serif",
            fontWeight: 800,
            fontSize: "clamp(3rem, 10vw, 7rem)",
            color: "#E6EDF3",
            letterSpacing: "-0.03em",
            lineHeight: 1,
            margin: 0,
          }}
          initial={{ y: "110%" }}
          animate={{ y: "0%" }}
          transition={{ delay: 0.5, duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
        >
          YOU&apos;RE
        </motion.h1>
      </div>

      {/* Line 2 */}
      <div style={{ overflow: "hidden" }}>
        <motion.h1
          style={{
            fontFamily: "'Syne', sans-serif",
            fontWeight: 800,
            fontSize: "clamp(3rem, 10vw, 7rem)",
            color: "#9BE931",
            letterSpacing: "-0.03em",
            lineHeight: 1,
            margin: 0,
            textShadow: "0 0 60px rgba(155,233,49,0.25)",
          }}
          initial={{ y: "110%" }}
          animate={{ y: "0%" }}
          transition={{ delay: 0.65, duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
        >
          IN.
        </motion.h1>
      </div>

      {/* Divider */}
      <motion.div
        style={{
          width: 64,
          height: 2,
          background: "rgba(155,233,49,0.3)",
          borderRadius: 1,
          marginTop: 48,
          marginBottom: 32,
        }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
      />

      {/* Body text */}
      <motion.p
        style={{
          fontFamily: "'DM Sans', sans-serif",
          color: "rgba(230,237,243,0.4)",
          fontSize: 16,
          maxWidth: 460,
          lineHeight: 1.75,
          margin: 0,
        }}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1, duration: 0.6 }}
      >
        We&apos;ve received your application. The selection committee will
        review your submission and reach out with next steps.
      </motion.p>

      {/* Tagline */}
      <motion.span
        style={{
          fontFamily: "'Space Mono', monospace",
          fontSize: 10,
          color: "rgba(155,233,49,0.3)",
          letterSpacing: "0.3em",
          marginTop: 40,
          display: "block",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.6 }}
      >
        // EDWINNOVA 2026
      </motion.span>

      <motion.button
  type="button"
  onClick={() => setSubmitted(false)}
  style={{
    marginTop: 48,
    padding: "14px 36px",
    background: "transparent",
    border: "1px solid rgba(155,233,49,0.2)",
    borderRadius: 8,
    fontFamily: "'Space Mono', monospace",
    fontSize: 11,
    letterSpacing: "0.2em",
    color: "rgba(155,233,49,0.5)",
    cursor: "pointer",
    transition: "all 0.25s",
  }}
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ delay: 1.7, duration: 0.5 }}
  onMouseEnter={(e) => {
    const el = e.currentTarget as HTMLElement;
    el.style.borderColor = "rgba(155,233,49,0.5)";
    el.style.color = "#9BE931";
  }}
  onMouseLeave={(e) => {
    const el = e.currentTarget as HTMLElement;
    el.style.borderColor = "rgba(155,233,49,0.2)";
    el.style.color = "rgba(155,233,49,0.5)";
  }}
>
  ← BACK
</motion.button>
    </div>
  </div>
);


  return (
    <div style={{ minHeight: "100vh", background: "#0B0F1A", padding: "110px 5% 90px", position: "relative" }}>

      {/* Back to Home */}
      <BackToHome />

      {/* Background grid */}
      <div style={{
        position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0,
        backgroundImage: "linear-gradient(rgba(155,233,49,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(155,233,49,0.03) 1px, transparent 1px)",
        backgroundSize: "64px 64px",
      }} />

      {/* Background glow */}
      <div style={{
        position: "fixed", top: "30%", left: "50%", transform: "translateX(-50%)",
        width: 700, height: 700, borderRadius: "50%", pointerEvents: "none", zIndex: 0,
        background: "radial-gradient(circle, rgba(155,233,49,0.035) 0%, transparent 70%)",
      }} />

      <div style={{ maxWidth: 760, margin: "0 auto", position: "relative", zIndex: 1 }}>

        {/* ── Header ── */}
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <p style={{
            fontFamily: "'Space Mono',monospace", fontSize: 10, color: "#9BE931",
            letterSpacing: "0.3em", marginBottom: 14,
            display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
          }}>
            <span style={{ display: "block", width: 24, height: 1, background: "#9BE931" }} />
            EDWINNOVA 2026
            <span style={{ display: "block", width: 24, height: 1, background: "#9BE931" }} />
          </p>
          <h1 style={{
            fontFamily: "'Syne',sans-serif", fontWeight: 800,
            fontSize: "clamp(2.2rem, 5vw, 3.8rem)", lineHeight: 1.05,
            letterSpacing: "-0.02em", color: "#E6EDF3", marginBottom: 16,
          }}>
            Hackathon{" "}
            <span style={{
              background: "linear-gradient(135deg, #9BE931, #d4f56e)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
            }}>
              Application
            </span>
          </h1>
          <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 15, color: "rgba(230,237,243,0.4)", lineHeight: 1.75 }}>
            Apply with your team to build the future — April 3–6, 2026 · Alvas Institute, Mangaluru
          </p>
        </div>

        <form onSubmit={handleSubmit} noValidate style={{ display: "flex", flexDirection: "column", gap: 44 }}>

          {/* ── 01 Team Info ── */}
          <div>
            <SectionLabel num="01" label="Team Information" />
            <GlassCard>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                <Field
                  icon={<User size={15} />}
                  placeholder="Team Name"
                  value={form.team_name}
                  onChange={(v) => updateField("team_name", v)}
                />
                <DomainSelect
                  value={form.domain}
                  onChange={(v) => updateField("domain", v)}
                />
              </div>
            </GlassCard>
          </div>

          {/* ── 02 Project Manager ── */}
          <div>
            <SectionLabel num="02" label="Project Manager" />
            <GlassCard>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                <Field
                  icon={<User size={15} />}
                  placeholder="Full Name"
                  value={form.pm_name}
                  onChange={(v) => updateField("pm_name", v)}
                />
                <Field
                  icon={<Mail size={15} />}
                  placeholder="Email Address"
                  value={form.pm_email}
                  onChange={(v) => updateField("pm_email", v)}
                  type="email"
                />
                <Field
                  icon={<Phone size={15} />}
                  placeholder="Phone Number"
                  value={form.pm_contact}
                  onChange={(v) => updateField("pm_contact", v)}
                />
                <Field
                  icon={<Phone size={15} />}
                  placeholder="Alternate Number (optional)"
                  value={form.alternate_number}
                  onChange={(v) => updateField("alternate_number", v)}
                />
              </div>
            </GlassCard>
          </div>

          {/* ── 03 Team Members ── */}
          <div>
            <SectionLabel num="03" label="Team Members" />
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {form.teammates.map((member, idx) => (
                <GlassCard key={idx}>

                  {/* Member header */}
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <div style={{
                        width: 30, height: 30, borderRadius: 8,
                        background: "rgba(155,233,49,0.07)",
                        border: "1px solid rgba(155,233,49,0.18)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                      }}>
                        <span style={{ fontFamily: "'Space Mono',monospace", fontSize: 11, color: "#9BE931" }}>
                          {String(idx + 1).padStart(2, "0")}
                        </span>
                      </div>
                      <span style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: 14, color: "#E6EDF3" }}>
                        Member {idx + 1}
                      </span>
                      <RoleBadge role={member.role} />
                    </div>
                    {form.teammates.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeTeammate(idx)}
                        style={{
                          background: "rgba(255,70,70,0.07)",
                          border: "1px solid rgba(255,70,70,0.18)",
                          borderRadius: 8, padding: "6px 9px", cursor: "pointer",
                          display: "flex", alignItems: "center",
                          color: "rgba(255,120,120,0.65)", transition: "all 0.2s",
                        }}
                        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(255,70,70,0.15)"; }}
                        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(255,70,70,0.07)"; }}
                      >
                        <Trash2 size={13} />
                      </button>
                    )}
                  </div>

                  {/* Member fields */}
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>

                    <Field
                      icon={<User size={15} />}
                      placeholder="Full Name"
                      value={member.name}
                      onChange={(v) => updateTeammate(idx, "name", v)}
                    />
                    <Field
                      icon={<Mail size={15} />}
                      placeholder="Email"
                      value={member.email}
                      onChange={(v) => updateTeammate(idx, "email", v)}
                      type="email"
                    />

                    {/* COMMENTED OUT: Role dropdown */}
                    {/* <RoleSelect
                      value={member.role}
                      onChange={(v) => updateTeammate(idx, "role", v)}
                    /> */}

                    {/* Role-conditional: GitHub for Dev, Portfolio for Designer */}
                    {/* <div>
                      {member.role === "Developer" && (
                        <Field
                          icon={<Github size={15} />}
                          placeholder="https://github.com/username"
                          value={member.github}
                          onChange={(v) => updateTeammate(idx, "github", v)}
                          type="url"
                        />
                      )}
                      {member.role === "Designer" && (
                        <Field
                          icon={<Globe size={15} />}
                          placeholder="Portfolio URL (Dribbble, Behance...)"
                          value={member.portfolio}
                          onChange={(v) => updateTeammate(idx, "portfolio", v)}
                          type="url"
                        />
                      )}
                      {!member.role && (
                        <div style={{
                          height: "100%", minHeight: 46,
                          border: "1px dashed rgba(155,233,49,0.1)",
                          borderRadius: 10,
                          display: "flex", alignItems: "center", padding: "0 16px",
                        }}>
                          <span style={{
                            fontFamily: "'Space Mono',monospace", fontSize: 11,
                            color: "rgba(230,237,243,0.18)", letterSpacing: "0.05em",
                          }}>
                            // Select role first
                          </span>
                        </div>
                      )}
                    </div> */}

                    {/* COMMENTED OUT: Resume upload — for ALL members */}
                    {/* <div style={{ gridColumn: "1 / -1" }}>
                      <p style={{
                        fontFamily: "'Space Mono',monospace", fontSize: 10,
                        color: "rgba(155,233,49,0.5)", letterSpacing: "0.12em", marginBottom: 8,
                      }}>
                        // RESUME REQUIRED FOR ALL MEMBERS
                      </p>
                      <ResumeZone
                        file={member.resume}
                        onFile={(f) => updateTeammate(idx, "resume", f)}
                      />
                    </div> */}

                  </div>
                </GlassCard>
              ))}

              {/* Add member */}
              {form.teammates.length < 4 && (
                <button
                  type="button"
                  onClick={addTeammate}
                  style={{
                    width: "100%", padding: "15px", borderRadius: 12,
                    background: "rgba(155,233,49,0.03)",
                    border: "1px dashed rgba(155,233,49,0.2)",
                    color: "rgba(155,233,49,0.6)",
                    fontFamily: "'Space Mono',monospace",
                    fontSize: 11, letterSpacing: "0.1em", cursor: "pointer",
                    display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                    transition: "all 0.25s",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.background = "rgba(155,233,49,0.07)";
                    el.style.borderColor = "rgba(155,233,49,0.35)";
                    el.style.color = "#9BE931";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.background = "rgba(155,233,49,0.03)";
                    el.style.borderColor = "rgba(155,233,49,0.2)";
                    el.style.color = "rgba(155,233,49,0.6)";
                  }}
                >
                  <Plus size={14} /> ADD TEAM MEMBER ({form.teammates.length}/4)
                </button>
              )}
            </div>
          </div>

          {/* ── 04 Proposal ── */}
          <div>
            <SectionLabel num="04" label="Project Proposal" />
            <GlassCard>
              <p style={{
                fontFamily: "'DM Sans',sans-serif", fontSize: 13,
                color: "rgba(230,237,243,0.35)", marginBottom: 18, lineHeight: 1.75,
              }}>
                Upload your proposal PDF — include the problem statement, solution overview, target market, and business model.
              </p>
              <ProposalZone file={proposal} onFile={setProposal} />
            </GlassCard>
          </div>

          {/* ── Submit ── */}
          <div style={{ paddingTop: 4 }}>
            <button
              type="submit"
              disabled={loading}
              style={{
                width: "100%", padding: "18px 32px",
                background: loading ? "rgba(155,233,49,0.25)" : "#9BE931",
                border: "none", borderRadius: 12,
                fontFamily: "'Space Mono',monospace", fontWeight: 700,
                fontSize: 13, letterSpacing: "0.12em", color: "#0B0F1A",
                cursor: loading ? "not-allowed" : "pointer",
                boxShadow: loading
                  ? "none"
                  : "0 0 30px rgba(155,233,49,0.25), 0 0 60px rgba(155,233,49,0.08)",
                transition: "all 0.3s",
              }}
              onMouseEnter={(e) => {
                if (!loading) {
                  const el = e.currentTarget as HTMLElement;
                  el.style.transform = "translateY(-2px)";
                  el.style.boxShadow = "0 0 50px rgba(155,233,49,0.45), 0 0 100px rgba(155,233,49,0.15)";
                }
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.transform = "none";
                el.style.boxShadow = "0 0 30px rgba(155,233,49,0.25), 0 0 60px rgba(155,233,49,0.08)";
              }}
            >
              {loading ? "SUBMITTING..." : "SUBMIT APPLICATION →"}
            </button>
            <p style={{
              textAlign: "center", fontFamily: "'Space Mono',monospace",
              fontSize: 10, color: "rgba(230,237,243,0.18)", marginTop: 14, letterSpacing: "0.15em",
            }}>
              // APPLICATIONS CLOSE MARCH 15, 2026
            </p>
          </div>

        </form>
      </div>
    </div>
  );
}