"use client";

import { useEffect, useState } from "react";

import { OrganizationService } from "@/services/organization.service";
import { ReviewService } from "@/services/review.service";
import { AuditService } from "@/services/audit.service";

import StatsCard from "@/components/dashboard/StatsCard";

export default function DashboardPage() {

  const [organizationCount, setOrganizationCount] =
    useState(0);

  const [reviewCount, setReviewCount] =
    useState(0);

  const [auditCount, setAuditCount] =
    useState(0);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    fetchDashboardData();

  }, []);

  const fetchDashboardData = async () => {

    try {

      const [
        organizations,
        reviews,
        audits,
      ] = await Promise.all([
        OrganizationService.getOrganizations(),
        ReviewService.getReviews(),
        AuditService.getAuditLogs(),
      ]);

      setOrganizationCount(
        organizations.count
      );

      setReviewCount(
        reviews.count
      );

      setAuditCount(
        audits.count
      );

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);
    }
  };

  if (loading) {

    return (
      <div className="text-xl">
        Loading dashboard...
      </div>
    );
  }

  return (
    <div>

      {/* Header */}
      <div className="mb-8">

        <h1 className="text-4xl font-bold text-slate-800">
          ESG Dashboard
        </h1>

        <p className="text-slate-500 mt-2">
          Real-time ESG ingestion & compliance monitoring
        </p>

      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

        <StatsCard
          title="Organizations"
          value={organizationCount.toString()}
          color="bg-blue-500"
        />

        <StatsCard
          title="Reviews"
          value={reviewCount.toString()}
          color="bg-orange-500"
        />

        <StatsCard
          title="Audit Logs"
          value={auditCount.toString()}
          color="bg-purple-500"
        />

        <StatsCard
          title="System Status"
          value="ACTIVE"
          color="bg-emerald-500"
        />

      </div>

      {/* Live Activity */}
      <div className="mt-10 bg-white rounded-2xl shadow p-6">

        <h2 className="text-2xl font-semibold mb-6">
          Platform Overview
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          <div className="border rounded-xl p-5">
            <p className="text-sm text-slate-500 mb-2">
              Organizations
            </p>

            <h3 className="text-3xl font-bold text-blue-600">
              {organizationCount}
            </h3>
          </div>

          <div className="border rounded-xl p-5">
            <p className="text-sm text-slate-500 mb-2">
              Pending Reviews
            </p>

            <h3 className="text-3xl font-bold text-orange-600">
              {reviewCount}
            </h3>
          </div>

          <div className="border rounded-xl p-5">
            <p className="text-sm text-slate-500 mb-2">
              Audit Events
            </p>

            <h3 className="text-3xl font-bold text-purple-600">
              {auditCount}
            </h3>
          </div>

        </div>

      </div>

    </div>
  );
}