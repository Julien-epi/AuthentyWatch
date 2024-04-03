"use client";

import Layout from "@/components/Layout/Layout";

export default function Home() {
  return <Layout>
    <section
      className="relative bg-[url(https://us.123rf.com/450wm/rotorania/rotorania2304/rotorania230417390/202869140-montres-de-luxe-expos%C3%A9es-dans-une-vitrine-rendu-3d.jpg?ver=6)] bg-cover bg-center bg-no-repeat"
    >
      <div
        className="absolute inset-0 bg-black/50 sm:bg-transparent sm:from-black/75 sm:to-transparent sm:bg-gradient-to-r"
      ></div>

      <div
        className="relative mx-auto max-w-screen-xl px-4 py-32 sm:px-6 lg:flex lg:h-screen lg:items-center lg:px-8"
      >
        <div className="max-w-xl text-center ltr:sm:text-left rtl:sm:text-right text-white">
          <h1 className="text-3xl font-extrabold sm:text-5xl">
            Welcome to

            <strong className="block font-extrabold text-gray-600">
              AuthentyWatch
            </strong>
          </h1>

          <p className="mt-4 max-w-lg sm:text-xl/relaxed">
            Using blockchain technology we provide a secure and transparent way to verify the authenticity of your luxury watches.
          </p>
        </div>
      </div>
    </section>
  </Layout>
}
