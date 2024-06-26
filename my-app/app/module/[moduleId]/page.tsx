import React from 'react'
import Module from '@/components/Module';
import { client } from "../../../sanity/lib/client";
export const dynamic = "force-dynamic";
export const revalidate = 0;
async function getData() {
  const query = `*[_type == "modules"]{
    modules,
    title,
    summary,
    sections,
    moduleId,
  }`;

  const data = await client.fetch(query);

  return data;
}

const page = async ({ params, }: {
  params: { moduleId: string };
}) => {
  const modules = await getData();
  
return (
  <>
    <Module modules={modules} selectedModuleId={params.moduleId} />
  </>
)
}

export default page