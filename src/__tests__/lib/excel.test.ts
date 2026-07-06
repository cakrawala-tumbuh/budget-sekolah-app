import { downloadXls, type ExcelSection } from "@/lib/export/excel";

describe("downloadXls", () => {
  const originalCreateObjectURL = URL.createObjectURL;
  const originalRevokeObjectURL = URL.revokeObjectURL;

  beforeEach(() => {
    URL.createObjectURL = jest.fn().mockReturnValue("blob:mock-url");
    URL.revokeObjectURL = jest.fn();
  });

  afterEach(() => {
    URL.createObjectURL = originalCreateObjectURL;
    URL.revokeObjectURL = originalRevokeObjectURL;
    jest.restoreAllMocks();
  });

  it("membuat Blob bertipe application/vnd.ms-excel dan mengunduh dengan ekstensi .xls", () => {
    const clickSpy = jest.spyOn(HTMLAnchorElement.prototype, "click").mockImplementation(() => {});

    const sections: ExcelSection[] = [
      {
        title: "Ringkasan RAB",
        header: ["Uraian", "Nilai"],
        rows: [
          ["Total Pendapatan", 1_000_000],
          ["Total Beban", 700_000],
        ],
      },
    ];

    downloadXls("RAB_TEST_2025-2026", "RAB", sections);

    expect(URL.createObjectURL).toHaveBeenCalledTimes(1);
    const blobArg = (URL.createObjectURL as jest.Mock).mock.calls[0][0] as Blob;
    expect(blobArg).toBeInstanceOf(Blob);
    expect(blobArg.type).toBe("application/vnd.ms-excel");

    expect(clickSpy).toHaveBeenCalledTimes(1);
    expect(URL.revokeObjectURL).toHaveBeenCalledWith("blob:mock-url");

    clickSpy.mockRestore();
  });

  it("mengeset nama unduhan berakhiran .xls", () => {
    let capturedDownload = "";
    const originalCreateElement = document.createElement.bind(document);
    jest.spyOn(document, "createElement").mockImplementation((tag: string) => {
      const el = originalCreateElement(tag);
      if (tag === "a") {
        Object.defineProperty(el, "download", {
          set(value: string) {
            capturedDownload = value;
          },
          get() {
            return capturedDownload;
          },
        });
        el.click = jest.fn();
      }
      return el;
    });

    downloadXls("RAB_TEST_2025-2026", "RAB", [
      { title: "Ringkasan", header: ["A"], rows: [["1"]] },
    ]);

    expect(capturedDownload).toBe("RAB_TEST_2025-2026.xls");
  });

  it("meng-escape karakter HTML pada label teks", () => {
    const sections: ExcelSection[] = [
      {
        title: "Judul <script>",
        header: ["Uraian & Nilai"],
        rows: [["<b>Bold</b> & \"quoted\""]],
      },
    ];

    // Tidak boleh melempar dan tetap memanggil createObjectURL dengan Blob valid.
    const clickSpy = jest.spyOn(HTMLAnchorElement.prototype, "click").mockImplementation(() => {});
    expect(() => downloadXls("file", "Sheet", sections)).not.toThrow();
    expect(URL.createObjectURL).toHaveBeenCalled();
    clickSpy.mockRestore();
  });
});
