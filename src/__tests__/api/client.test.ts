import { ApiError } from "@/lib/api/client";

describe("ApiError", () => {
  it("membuat error dengan status dan message yang benar", () => {
    const err = new ApiError(404, "Not found");
    expect(err.status).toBe(404);
    expect(err.message).toBe("Not found");
    expect(err.name).toBe("ApiError");
    expect(err).toBeInstanceOf(Error);
  });

  it("merupakan instanceof Error", () => {
    const err = new ApiError(500, "Server error");
    expect(err instanceof Error).toBe(true);
    expect(err instanceof ApiError).toBe(true);
  });
});

describe("apiFetch()", () => {
  const originalFetch = global.fetch;

  afterEach(() => {
    global.fetch = originalFetch;
  });

  it("mengembalikan JSON saat response OK", async () => {
    const mockData = { id: 1, name: "Test" };
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: () => Promise.resolve(mockData),
    } as unknown as Response);

    const { apiFetch } = await import("@/lib/api/client");
    const result = await apiFetch<typeof mockData>("/test");
    expect(result).toEqual(mockData);
  });

  it("melempar ApiError saat response tidak OK", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      status: 404,
      statusText: "Not Found",
      json: () => Promise.resolve({ detail: "Not found" }),
    } as unknown as Response);

    const { apiFetch } = await import("@/lib/api/client");

    await expect(apiFetch("/missing")).rejects.toThrow(ApiError);
    await expect(apiFetch("/missing")).rejects.toMatchObject({ status: 404 });
  });
});
