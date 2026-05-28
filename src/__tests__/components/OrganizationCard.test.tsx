import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { OrganizationCard } from "@/components/organizations/OrganizationCard";
import type { Organization } from "@/lib/types";

// Mock next/link agar tidak perlu router di test
jest.mock("next/link", () => {
  const MockLink = ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  );
  MockLink.displayName = "MockLink";
  return MockLink;
});

const mockOrg: Organization = {
  id: 1,
  code: "SD-MBL",
  name: "SD Maria Bintang Laut",
  org_type: "UNIT",
  city: "Bandung",
  parent_id: 2,
  created_at: "2025-01-01T00:00:00",
  updated_at: "2025-01-01T00:00:00",
};

describe("OrganizationCard", () => {
  it("menampilkan nama organisasi", () => {
    render(<OrganizationCard org={mockOrg} />);
    expect(screen.getByText("SD Maria Bintang Laut")).toBeInTheDocument();
  });

  it("menampilkan kode organisasi", () => {
    render(<OrganizationCard org={mockOrg} />);
    expect(screen.getByText("SD-MBL")).toBeInTheDocument();
  });

  it("menampilkan kota jika ada", () => {
    render(<OrganizationCard org={mockOrg} />);
    expect(screen.getByText("Bandung")).toBeInTheDocument();
  });

  it("menampilkan badge tipe organisasi", () => {
    render(<OrganizationCard org={mockOrg} />);
    expect(screen.getByText("Unit")).toBeInTheDocument();
  });

  it("menampilkan link ke halaman detail", () => {
    render(<OrganizationCard org={mockOrg} />);
    const detailLink = screen.getByRole("link", { name: /detail/i });
    expect(detailLink).toHaveAttribute("href", "/organizations/1");
  });

  it("menampilkan link ke halaman simulasi", () => {
    render(<OrganizationCard org={mockOrg} />);
    const simLink = screen.getByRole("link", { name: /simulasi/i });
    expect(simLink).toHaveAttribute("href", "/organizations/1/simulation");
  });

  it("memanggil onDelete saat tombol hapus diklik (dengan konfirmasi)", async () => {
    const user = userEvent.setup();
    const onDelete = jest.fn();
    window.confirm = jest.fn(() => true);

    render(<OrganizationCard org={mockOrg} onDelete={onDelete} />);

    const hapusBtn = screen.getByRole("button", { name: /hapus/i });
    await user.click(hapusBtn);

    expect(onDelete).toHaveBeenCalledWith(1);
  });

  it("tidak memanggil onDelete jika konfirmasi dibatalkan", async () => {
    const user = userEvent.setup();
    const onDelete = jest.fn();
    window.confirm = jest.fn(() => false);

    render(<OrganizationCard org={mockOrg} onDelete={onDelete} />);

    const hapusBtn = screen.getByRole("button", { name: /hapus/i });
    await user.click(hapusBtn);

    expect(onDelete).not.toHaveBeenCalled();
  });

  it("tidak menampilkan tombol hapus jika onDelete tidak diberikan", () => {
    render(<OrganizationCard org={mockOrg} />);
    expect(screen.queryByRole("button", { name: /hapus/i })).not.toBeInTheDocument();
  });
});
