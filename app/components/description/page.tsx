"use client";
import jobs from "../../../public/assets/jobs.json";
import MainDescription from "./MainDescription";
import SideBarDescription from "./SideBarDescription";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface Job {
  title: string;
  description: string;
  responsibilities: string[];
  ideal_candidate: IdealCandidate;
  when_where: string;
  about: About;
  company: string;
  image: string;
}

interface IdealCandidate {
  age: string;
  gender: string;
  traits: string[];
}

interface About {
  posted_on: string;
  deadline: string;
  location: string;
  start_date: string;
  end_date: string;
  categories: string[];
  required_skills: string[];
}

export default function Page() {
  const search = useSearchParams();
  const index = search.get("index");

  const [job, setJob] = useState<Job>();

  useEffect(() => {
    if (index !== null) {
      const idx = parseInt(index);

      if (!isNaN(idx) && idx >= 0 && idx < jobs.job_postings.length) {
        setJob(jobs.job_postings[idx]);
      }
    }
  }, [index]);

  if (!job) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex justify-between">
      <MainDescription
        description={job.description}
        responsiblities={job.responsibilities}
        traits={job.ideal_candidate.traits}
        age={job.ideal_candidate.age}
        gender={job.ideal_candidate.gender}
        whenAndWhere={job.when_where}
      />
      <SideBarDescription
        posted_on={job.about.posted_on}
        deadline={job.about.deadline}
        location={job.about.location}
        start_date={job.about.start_date}
        end_date={job.about.end_date}
        catagories={job.about.categories}
        required_skills={job.about.required_skills}
      />
    </div>
  );
}
