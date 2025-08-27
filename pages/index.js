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
    <div style={{ background: "#111", color: "white", minHeight: "100vh", padding: "20px" }}>
      <h1>Prof Dali Nadjib</h1>

      <div style={{ margin: "10px 0" }}>
        <select value={grade} onChange={e => setGrade(e.target.value)}>
          <option value="1">الطور 1</option>
          <option value="2">الطور 2</option>
        </select>

        <select value={subject} onChange={e => setSubject(e.target.value)} style={{ marginLeft: "10px" }}>
          <option value="Math">رياضيات</option>
          <option value="Science">علوم</option>
        </select>

        <select value={level} onChange={e => setLevel(e.target.value)} style={{ marginLeft: "10px" }}>
          <option value="Easy">سهل</option>
          <option value="Medium">متوسط</option>
          <option value="Hard">صعب</option>
        </select>
      </div>

      <button onClick={generateText} style={{ padding: "10px 20px", marginTop: "10px" }}>
        {loading ? "جاري التوليد..." : "توليد"}
      </button>

      <textarea
        value={output}
        readOnly
        style={{ width: "100%", height: "300px", marginTop: "20px", background: "#222", color: "white", padding: "10px" }}
      ></textarea>
    </div>
  );
}
