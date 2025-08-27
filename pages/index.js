import { useState } from "react";

export default function Home() {
  const [grade, setGrade] = useState("1");
  const [subject, setSubject] = useState("Math");
  const [level, setLevel] = useState("Easy");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const generateText = async () => {
    setLoading(true);
    setOutput("...جاري التوليد");

    const prompt = `أنشئ مذكرة أو اختبار للطـور ${grade}, مادة ${subject}, مستوى ${level}`;

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt })
      });

      const data = await res.json();
      setOutput(data.text || "لم يتم توليد النص، حاول مرة أخرى.");
    } catch (err) {
      setOutput("حدث خطأ: " + err.message);
    }

    setLoading(false);
  };

  return (
    <div style={{
      backgroundColor: "#121212",
      color: "#FFFFFF",
      minHeight: "100vh",
      padding: "20px",
      fontFamily: "Arial, sans-serif"
    }}>
      <h1 style={{ textAlign: "center", marginBottom: "30px" }}>Prof Dali Nadjib</h1>

      <div style={{ display: "flex", justifyContent: "center", gap: "10px", marginBottom: "20px", flexWrap: "wrap" }}>
        <select value={grade} onChange={e => setGrade(e.target.value)} style={{ padding: "8px" }}>
          <option value="1">الطور 1</option>
          <option value="2">الطور 2</option>
        </select>

        <select value={subject} onChange={e => setSubject(e.target.value)} style={{ padding: "8px" }}>
          <option value="Math">رياضيات</option>
          <option value="Science">علوم</option>
          <option value="Arabic">عربية</option>
          <option value="History">تاريخ</option>
        </select>

        <select value={level} onChange={e => setLevel(e.target.value)} style={{ padding: "8px" }}>
          <option value="Easy">سهل</option>
          <option value="Medium">متوسط</option>
          <option value="Hard">صعب</option>
        </select>
      </div>

      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <button
          onClick={generateText}
          style={{
            padding: "10px 25px",
            backgroundColor: "#1E88E5",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "16px"
          }}
        >
          {loading ? "جاري التوليد..." : "توليد"}
        </button>
      </div>

      <textarea
        value={output}
        readOnly
        placeholder="سيظهر النص الناتج هنا..."
        style={{
          width: "100%",
          height: "300px",
          backgroundColor: "#1E1E1E",
          color: "white",
          padding: "15px",
          borderRadius: "8px",
          border: "1px solid #333",
          fontSize: "14px",
          resize: "none"
        }}
      />
    </div>
  );
}
