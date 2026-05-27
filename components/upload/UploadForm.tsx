"use client";

import { useEffect, useState } from "react";

import api from "@/lib/axios";

interface Organization {
  id: string;
  name: string;
}

interface DataSource {
  id: string;
  name: string;
}

export default function UploadForm() {

  const [organizations, setOrganizations] =
    useState<Organization[]>([]);

  const [sources, setSources] =
    useState<DataSource[]>([]);

  const [organizationId, setOrganizationId] =
    useState("");

  const [sourceId, setSourceId] =
    useState("");

  const [file, setFile] =
    useState<File | null>(null);

  const [loading, setLoading] =
    useState(false);

  const [message, setMessage] =
    useState("");

  useEffect(() => {

    fetchOrganizations();
    fetchSources();

  }, []);

  // Fetch Organizations
  const fetchOrganizations = async () => {

    try {

      const response = await api.get(
        "/organizations/"
      );

      setOrganizations(
        response.data.results
      );

    } catch (error) {

      console.error(error);
    }
  };

  // Fetch Data Sources
  const fetchSources = async () => {

    try {

      const response = await api.get(
        "/ingestion/data-sources/"
      );

      setSources(
        response.data.results
      );

    } catch (error) {

      console.error(error);
    }
  };

  // Upload CSV
  const handleSubmit = async (
    e: React.FormEvent
  ) => {

    e.preventDefault();

    setMessage("");

    if (!organizationId) {
      setMessage(
        "Please select organization"
      );
      return;
    }

    if (!sourceId) {
      setMessage(
        "Please select data source"
      );
      return;
    }

    if (!file) {
      setMessage(
        "Please select CSV file"
      );
      return;
    }

    try {

      setLoading(true);

      const formData = new FormData();

      formData.append(
        "organization_id",
        organizationId
      );

      formData.append(
        "source_id",
        sourceId
      );

      formData.append(
        "uploaded_by",
        "Keshav"
      );

      formData.append(
        "file",
        file
      );

      const response = await api.post(
        "/ingestion/upload/",
        formData,
        {
          headers: {
            "Content-Type":
              "multipart/form-data",
          },
        }
      );

      setMessage(
        response.data.message
      );

      setFile(null);

    } catch (error: any) {

      console.error(error);

      setMessage(
        error?.response?.data?.message ||
        "Upload failed"
      );

    } finally {

      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow p-8 max-w-3xl">

      <form
        onSubmit={handleSubmit}
        className="space-y-6"
      >

        {/* Organization */}
        <div>

          <label className="block mb-2 font-semibold text-slate-700">

            Organization

          </label>

          <select
            value={organizationId}
            onChange={(e) =>
              setOrganizationId(
                e.target.value
              )
            }
            className="w-full border rounded-xl p-3"
          >

            <option value="">
              Select Organization
            </option>

            {organizations.map(
              (organization) => (

              <option
                key={organization.id}
                value={organization.id}
              >
                {organization.name}
              </option>
            ))}

          </select>

        </div>

        {/* Data Source */}
        <div>

          <label className="block mb-2 font-semibold text-slate-700">

            Data Source

          </label>

          <select
            value={sourceId}
            onChange={(e) =>
              setSourceId(
                e.target.value
              )
            }
            className="w-full border rounded-xl p-3"
          >

            <option value="">
              Select Data Source
            </option>

            {sources.map((source) => (

              <option
                key={source.id}
                value={source.id}
              >
                {source.name}
              </option>
            ))}

          </select>

        </div>

        {/* File */}
        <div>

          <label className="block mb-2 font-semibold text-slate-700">

            CSV File

          </label>

          <input
            type="file"
            accept=".csv"
            onChange={(e) => {

              if (
                e.target.files?.[0]
              ) {

                setFile(
                  e.target.files[0]
                );
              }
            }}
            className="w-full border rounded-xl p-3"
          />

        </div>

        {/* Status */}
        {message && (

          <div className="bg-slate-100 rounded-xl p-4 text-slate-700">

            {message}

          </div>
        )}

        {/* Button */}
        <button
          type="submit"
          disabled={loading}
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-xl transition font-medium"
        >

          {loading
            ? "Uploading..."
            : "Upload CSV"}

        </button>

      </form>

    </div>
  );
}