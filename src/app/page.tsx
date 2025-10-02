import { PageWrapper } from "@/components/PageWrapper";

export default function Home() {
  return (
    <PageWrapper>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          widows: "100%",
        }}
      >
        <h1 style={{ fontFamily: "sans-serif" }}>Home!</h1>
      </div>
    </PageWrapper>
  );
}
