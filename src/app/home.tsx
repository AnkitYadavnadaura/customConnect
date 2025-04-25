// pages/index.tsx (or .jsx if not using TypeScript)

import { useState, useEffect } from "react";
import { ethers } from "ethers";
import type { Contract } from "ethers";
import dnsAbi from "../abi/NFTCryptoDNS.json"; // ABI here

const CONTRACT_ADDRESS = "0xYourContractAddressHere";

export function Home() {
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState<Contract | null>(null);
  const [domains, setDomains] = useState([]);
  const [selectedDomain, setSelectedDomain] = useState("");
  const [newDomain, setNewDomain] = useState("");
  const [newMeta, setNewMeta] = useState("");
  const [sub, setSub] = useState("");
  const [subMeta, setSubMeta] = useState("");
  const [subdomains, setSubdomains] = useState([]);
  const [resolvedMeta, setResolvedMeta] = useState("");

  useEffect(() => {
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.BrowserProvider(window.ethereum);
      provider.getSigner().then(async (signer) => {
        const dns = new ethers.Contract(CONTRACT_ADDRESS, dnsAbi, signer);
        const address = await signer.getAddress();
        setAccount(address);
        setContract(dns);
      });
    }
  }, []);

  async function register() {
  if (!contract) return;

  const tx = await contract.register(newDomain, newMeta, {
    value: ethers.parseEther("0.01"),
  });
  await tx.wait();
    setNewDomain("");
    setNewMeta("");
    fetchDomains();
  }

  async function fetchDomains() {
    if (!contract || !account) return;
    let list = [];
    for (let i = 1; i < 100; i++) {
      try {
        const [owner, expiry, metadata] = await contract.getDomainInfo(
          `domain${i}`
        );
        if (owner.toLowerCase() === account.toLowerCase()) {
          list.push({ name: `domain${i}`, expiry, metadata });
        }
      } catch {
        break;
      }
    }
    setDomains(list);
  }

  async function addSubdomain() {
    if (!contract || !account) return;
    const tx = await contract.addSubdomain(selectedDomain, sub, subMeta);
    await tx.wait();
    setSub("");
    setSubMeta("");
    loadSubdomains(selectedDomain);
  }

  async function loadSubdomains(parent) {
    if (!contract || !account) return;
    const subs = await contract.listSubdomains(parent);
    setSubdomains(subs);
  }

  async function resolveName(name) {
    if (!contract || !account) return;
    try {
      const meta = await contract.resolve(name);
      setResolvedMeta(meta);
    } catch (e) {
      setResolvedMeta("Not found or expired");
    }
  }

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">CryptoDNS (Next.js)</h1>

      <div className="mb-4">
        <h2 className="text-xl font-semibold">Register New Domain</h2>
        <input
          className="input"
          placeholder="example"
          value={newDomain}
          onChange={(e) => setNewDomain(e.target.value)}
        />
        <input
          className="input"
          placeholder="Metadata URI"
          value={newMeta}
          onChange={(e) => setNewMeta(e.target.value)}
        />
        <button className="btn" onClick={register}>
          Register (0.01 ETH)
        </button>
      </div>

      <div className="mb-4">
        <h2 className="text-xl font-semibold">Your Domains</h2>
        <button onClick={fetchDomains} className="btn">
          Load My Domains
        </button>
        <ul className="mt-2 space-y-2">
          {domains.map((d, i) => (
            <li key={i} className="border p-2 rounded">
              <strong>{d.name}</strong> - Expires: {new Date(
                Number(d.expiry) * 1000
              ).toLocaleDateString()}
              <div className="text-sm">Metadata: {d.metadata}</div>
              <button
                className="btn-sm mt-1"
                onClick={() => {
                  setSelectedDomain(d.name);
                  loadSubdomains(d.name);
                }}
              >
                Manage Subdomains
              </button>
            </li>
          ))}
        </ul>
      </div>

      {selectedDomain && (
        <div className="mb-4">
          <h2 className="text-xl font-semibold">
            Subdomains of {selectedDomain}
          </h2>
          <input
            className="input"
            placeholder="sub"
            value={sub}
            onChange={(e) => setSub(e.target.value)}
          />
          <input
            className="input"
            placeholder="Metadata URI"
            value={subMeta}
            onChange={(e) => setSubMeta(e.target.value)}
          />
          <button className="btn" onClick={addSubdomain}>
            Add Subdomain
          </button>
          <ul className="mt-2">
            {subdomains.map((s, i) => (
              <li key={i} className="text-sm">{s}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="mb-4">
        <h2 className="text-xl font-semibold">Resolve Domain/Subdomain</h2>
        <input
          className="input"
          placeholder="blog.example"
          onChange={(e) => resolveName(e.target.value)}
        />
        <div className="text-sm mt-1">Metadata: {resolvedMeta}</div>
      </div>
    </div>
  );
}
