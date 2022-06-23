import Head from "next/head";
import Image from "next/image";
import { Banner, Header, Row } from "../components";
import { Movie, RowData } from "../types/types";
import { requests } from "../utils/request";
export interface Props {
  netflixOriginals: Movie[];
  rowData: RowData[];
}

const Home = ({ netflixOriginals, rowData }: Props) => {
  return (
    <div className="relative h-screen bg-gradient-to-b lg:h-[140vh]">
      <Head>
        <title>Traiflix - Home</title>
        <link rel="icon" href="/favicon.png" />
      </Head>
      <Header />
      <main className="relative pl-[54px] pb-24 lg:space-y-24 lg:pl-[58px]">
        <Banner netflixOriginals={netflixOriginals} />
        <section>
          {rowData.map((data) => (
            <Row title={data.title} movies={data.movies} key={data.title} />
          ))}
        </section>
      </main>
    </div>
  );
};

export const getServerSideProps = async () => {
  const [
    netflixOriginals,
    trendingNow,
    topRated,
    actionMovies,
    comedyMovies,
    horrorMovies,
    romanceMovies,
    documentaries,
  ] = await Promise.all([
    fetch(requests.fetchNetflixOriginals).then((res) => res.json()),
    fetch(requests.fetchTrending).then((res) => res.json()),
    fetch(requests.fetchTopRated).then((res) => res.json()),
    fetch(requests.fetchActionMovies).then((res) => res.json()),
    fetch(requests.fetchComedyMovies).then((res) => res.json()),
    fetch(requests.fetchHorrorMovies).then((res) => res.json()),
    fetch(requests.fetchRomanceMovies).then((res) => res.json()),
    fetch(requests.fetchDocumentaries).then((res) => res.json()),
  ]);

  return {
    props: {
      netflixOriginals: netflixOriginals.results,
      rowData: [
        {
          title: "Trending Now",
          movies: trendingNow.results,
        },
        {
          title: "Top Rated",
          movies: topRated.results,
        },
        {
          title: "Action Movies",
          movies: actionMovies.results,
        },
        {
          title: "Comedy Movies",
          movies: comedyMovies.results,
        },
        {
          title: "Horror Movies",
          movies: horrorMovies.results,
        },
        {
          title: "Romance Movies",
          movies: romanceMovies.results,
        },
        {
          title: "Documentaries",
          movies: documentaries.results,
        },
      ],
    },
  };
};

export default Home;
