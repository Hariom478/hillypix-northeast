import { useState, useEffect, useRef } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useIsMobile } from '@/hooks/use-mobile';
import { getTitleDetail } from "@/lib/graphql";
import { useLocation, useNavigate } from "react-router-dom";
import { BookmarkPlus, Star } from 'lucide-react';
import Reviews from '@/components/Reviews';
import { getReviewList } from "@/lib/graphql";
import { toast } from '@/components/ui/sonner';
import { saveReview } from "@/lib/graphql";
import { useToast } from '@/hooks/use-toast';
const sampleVideo = "https://www.w3schools.com/html/mov_bbb.mp4"; // swap with your actual video path
const posterImage = "src/assets/movie-poster-2.jpg"; // provided image path
import { getUser } from "@/lib/localAuth";
import { getToken } from "@/lib/localAuth";
import TicketPurchaseDialog from '../components/TicketPurchaseDialog';
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);
import placeholderBanner from "@/assets/banner_placeholder.png";
import { title } from 'process';


const reviews = [
  {
    id: 1,
    user_name: "Test",
    rating: 5,
    comment: "Done DONE",
    time_ago: "5 months ago",
    avatar: "src/assets/image.webp",
  },
];



type Card = {
  id: number;
  title: string;
  subtitle?: string;
  image: string;
};


const cards: Card[] = Array.from({ length: 8 }).map((_, i) => ({
  id: i + 1,
  title: i === 0 ? "CATHY" : "Ngamn Samtangpu",
  subtitle: i === 0 ? "Feature Film" : "Rongmei Version",
  image: posterImage,
}));

interface UserType {
  id: number;
  first_name?: string;
  last_name?: string;
}

interface SubmitInput {
  title_id: number;
  body: string;
  score: number;
  user_id: number;
}

function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
}

const Details = ({ params }) => {

  const user = getUser();
  const userToken = getToken();
  const { state } = useLocation();
  const navigate = useNavigate();
  const movie = state?.videos;


  const [activeTab, setActiveTab] = useState<"cast" | "reviews" | "null">("null");
  const carouselRef = useRef<HTMLDivElement | null>(null);
  // const [lists, setLists] = useState([]);
  // const [selectedListId, setSelectedListId] = useState(null);
  // const [movies, setMovies] = useState([]);
  // const [allMovies, setAllMovies] = useState([]);

  function scrollBy(offset: number) {
    if (!carouselRef.current) return;
    carouselRef.current.scrollBy({ left: offset, behavior: "smooth" });
  }
  const [activeSeason, setActiveSeason] = useState<number>(0);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);

  const [loading, setLoading] = useState(true);
  const [titleData, setTitleData] = useState([]);
  const [showFullText, setShowFullText] = useState(false);

  const [morelikethis, setMoreLikeThis] = useState([])

  const [reviewsData2, setReviewsData2] = useState([]);
  const [totalReviewData, setTotalReviewData] = useState([]);
  const [rating2, setRating2] = useState([]);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);


function getReviewScore(r: any) {
  return Number(r?.score ?? r?.rating ?? 0);
}
function getReviewBody(r: any) {
  return r?.body ?? r?.comment ?? "";
}
function getReviewUserId(r: any) {
  return Number(r?.user?.id ?? r?.user_id ?? r?.userId ?? NaN);
}

const handleShow = () => {
  console.log("handleShow called", { user, reviewsData2 });

  if (!user) {
    console.log("No user available — opening blank modal (or you could require login).");
  }

  const uid = Number(user?.id ?? user?.user_id ?? NaN);

  // try a best-effort find by user id first (most reliable)
  let alreadyReviewed = Array.isArray(reviewsData2)
    ? reviewsData2.find((r: any) => {
        const rid = getReviewUserId(r);
        if (!isNaN(rid) && !isNaN(uid)) return rid === uid;
        // fallback: try matching by username strings if id missing
        const uname = (r?.user?.first_name ?? r?.user_name ?? r?.user?.name ?? "").toString().toLowerCase();
        const myname = (user?.name ?? `${user?.first_name ?? ""} ${user?.last_name ?? ""}`).toString().toLowerCase();
        return uname && myname ? uname === myname : false;
      })
    : undefined;

  // extra fallback: if not found, try matching by username (in case reviews array shape differs)
  if (!alreadyReviewed && Array.isArray(reviewsData2)) {
    const myname = (user?.name ?? `${user?.first_name ?? ""} ${user?.last_name ?? ""}`).toString().toLowerCase();
    alreadyReviewed = reviewsData2.find((r: any) => {
      const uname = (r?.user?.first_name ?? r?.user_name ?? r?.user?.name ?? "").toString().toLowerCase();
      return myname && uname ? uname === myname : false;
    });
  }

  console.log("Matched review:", alreadyReviewed);

  if (alreadyReviewed) {
    setRating(getReviewScore(alreadyReviewed));
    setComment(getReviewBody(alreadyReviewed));
  } else {
    setRating(0);
    setComment("");
  }

  setShowModal(true);
};

  const handleClose = () => setShowModal(false);

  const [rentshowmodal, setRentShowModal] = useState(false);

  const [selectedMovie, setSelectedMovie] = useState<any>(null);
  const [isTicketDialogOpen, setIsTicketDialogOpen] = useState(false);


  const fetchReviews = async () => {
    try {
      const res = await getReviewList(Number(movie?.id), 1, 10);

      setReviewsData2(res?.getReviewList?.data || []);
      setRating2(res?.getReviewList?.aggregates);
      setTotalReviewData(res?.getReviewList?.aggregates || []);
      // Find user review (if exists)
      const myReview = reviews?.find((r: any) => r.user_id == user?.id);


    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };


  

  useEffect(() => {
    if (movie?.id) {
      fetchReviews();
    }
  }, [movie?.id]);


  useEffect(() => {
    const ressdkss = loadScript("https://checkout.razorpay.com/v1/checkout.js");
    if (!ressdkss) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    } else {
      console.log("Confirm this");
    }
  });

  const handleRentClose = () => {
    setRentShowModal(false);
  };

  const handleBuyTicket = (movie: any) => {
    setSelectedMovie(movie);
    setIsTicketDialogOpen(true);
  };

  const handlePlay = (movie) => {
    const videos = movie.videos[0];
    navigate("/watch", { state: { videos } });
  }

  const handleSubmitReview = async () => {

    if (!userToken) {
      toast.error("You need to log in to submit a review.");
      return;
    }

    if (!rating || isNaN(rating) || rating < 1 || rating > 5) {
      toast.error("Please provide a valid rating between 1 and 5.");
      return;
    }

    try {
      const inputData: SubmitInput = {
        title_id: Number(movie?.id),
        body: comment.trim(),
        score: rating,
        user_id: Number(user?.id),
      };

      // Validate ID
      if (isNaN(inputData.title_id)) {
        toast.error("Invalid title ID.");
        return;
      }

      // Save review
      const response = await saveReview(inputData);

      if (response?.saveReview?.message === "success") {
        toast.success("Review submitted successfully!");
        await fetchReviews();
        setComment("");
        handleClose();
      } else {
        toast.error(`Submission failed: ${response?.saveReview?.message}`);
      }
    } catch (error) {
      console.error("Error submitting review:", error);
      toast.error("An error occurred while submitting the review.");
    }
  }






  function getFirstWords(text: string, count: number) {
    return text.split(" ").slice(0, count).join(" ");
  }

  useEffect(() => {
    // fetch when slug changes (avoid running on every render)
    getTitleDetail(movie?.slug, user?.id)
      .then((res) => {
        const data = res?.getTitleDetail?.data || null;
        setTitleData(data?.title[0]);
        setMoreLikeThis(data?.more_like_this);
        // setLoading(true)
        // console.log("Fetched title detail:",data?.more_like_this);
      })
      .catch((err) => {
        console.error('Failed to fetch title detail', err);
      })
      .finally(() => setLoading(false));
  }, [movie?.slug]);


  // if (loading) return <div className="text-white p-10">Loading...</div>;
  // if (!titleData) return <div className="text-red-500 p-10">No data found</div>;

  // const title = titleData?.title || null;
  // const similar = titleData?.more_like_this || [];

  useEffect(() => {
    if (!titleData) return;

    if (titleData?.type === "tvSeries") {
      setActiveTab("episodes");   // If series → default Episodes
    } else {
      setActiveTab("cast");       // If movie → default Cast
    }
  }, [titleData]);



  // normalize type checks for series/TV
  const isSeries = (titleData?.type === 'series' || titleData?.type === 'tvSeries' || titleData?.type === 'tv_series');

  const fullText =
    titleData?.overview ||
    titleData?.statement ||
    "No description available.";

  const shortText = getFirstWords(fullText, 20);

  const shouldTruncate = fullText.split(" ").length > 20;


  async function payRent(movie) {
    if (!user?.id) {
      toast("Login User !", { description: "Please Login First." });
      window.location.href = "/login";
      return false;
    }

    try {
      let payload = {
        amount: movie?.getpayperwatch.amount,
        userID: user?.id,
        payperwatchID: movie?.getpayperwatch?.id,
      };

      // setNewLoading(true);
      const res = await fetch(
        // `${process.env.NEXT_PUBLIC_API_BASEPATH_V2}/payrent-order`,
        'https://stageconsole.hillypix.com/api/payrent-order',
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const result = await res.json();

      if (result.status == false) {

        toast("API ISSUES !", { description: result.message });
        // toast.error(result.message);
      }

      const options = {
        key: result.key,
        amount: result.data.amount, // amount in paise
        currency: "INR",
        name: "Hillywood Private Limited",
        description: "Hillywood Private Limited Rent Payment",
        order_id: result.orderID,
        prefill: {
          email: user.email,
          contact: user.mobile_number,
        },
        handler: async function (response) {
          // console.log("response response response",response);
          // setNewLoading(false);
          toast("Successfully !", { description: "You’ve successfully rented this video. Enjoy watching!" });
          //   toast({
          //       title: "Successfully !",
          //       description: "You’ve successfully rented this video. Enjoy watching!",
          //  });
          // toast.success(
          //   "You’ve successfully rented this video. Enjoy watching!"
          // );
          setTimeout(() => {
            location.reload();
          }, 5000);
        },

        modal: {
          ondismiss: function () {
            // setNewLoading(false);
            alert("Payment popup closed by user");
          },
        },
        theme: { color: "#ff5900ff" },
      };

      const rzp = new Razorpay(options);

      rzp.open();
    } catch (err) {
      console.error("payRent error:", err);

      toast("Payment initiation failed!", { description: "Payment initiation failed!" });
      // toast({
      //         title: "Payment initiation failed!",
      //         description: "Payment initiation failed!",
      //    });

      // toast.error("Payment initiation failed!");
    }
  }


  return (
    <div className="min-h-screen bg-background">
      <Header />

      <section className="relative h-[520px] lg:h-[600px] overflow-hidden bannersectiondetail">
        {loading ? (
          <div className="h-[520px] lg:h-[600px] bg-[#111] animate-pulse"></div>
        ) : (

          <div
            className="absolute inset-0 w-full h-full overflow-hidden"
            style={{
              backgroundImage: `url(${titleData?.tv_banner || placeholderBanner})`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
            }}
          >
          {titleData?.trailer_video_url && (
            <video
              className="absolute inset-0 w-full h-full object-cover"
              src={titleData?.trailer_video_url}
              autoPlay
              muted
              loop
              playsInline
            />
          )}
        </div>

        )}

      
        {/* Gradient fade at bottom */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent" />

        
        {/* Content overlay */}
        <div className="container relative z-10 px-6 lg:px-8 h-full flex flex-col justify-center">
          <div className="w-full md:w-10/12 lg:w-8/12">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-3">{titleData?.title}</h1>

            <div className="flex items-center gap-3 text-sm text-gray-200 mb-4">
              <span>{titleData?.type || 'Item'}</span>
              <span>•</span>
              {(Array.isArray(titleData?.genres) ? titleData.genres : (titleData?.genres ? [titleData.genres] : [])).slice(0, 3).map((g: any, idx: number) => (<span key={idx}>{g}{idx < 2 ? ' • ' : ''}</span>))}
              <span className="ml-2 inline-flex items-center bg-yellow-400 text-black px-2 py-0.5 rounded text-sm">⭐  {titleData?.review_avg
                ? titleData?.review_avg.toFixed(1)
                : 0}</span>
            </div>

            <p className="text-sm text-gray-200 max-w-prose mb-4">
              {showFullText ? fullText : shortText + (shouldTruncate ? "..." : "")}
              {shouldTruncate && (
                <button
                  onClick={() => setShowFullText(!showFullText)}
                  className="text-purple-400 text-sm mt-1 hover:underline"
                >
                  {showFullText ? " Read less" : " Read more"}
                </button>
              )}
            </p>



            <div className="flex items-center gap-3">
            {titleData?.type !== "tvSeries" && (

                !user ? (
                  // 👉 USER NOT LOGGED IN — Show Login Button
                  <button
                 onClick={() => {
                       toast("Login..!", { description: "Please Login to Watch..!" });
                      return;
                    }}
                    className="bg-[#410e7b] hover:bg-purple-950 px-5 py-2 rounded-md text-white flex items-center gap-2 text-sm"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M3 10h12M10 3l5 7-5 7" />
                    </svg>
                    Login to Watch
                  </button>
                ) : (

                  // 👉 USER LOGGED IN — original logic
                  titleData?.getpayperwatch ? (
                    <button  
                      onClick={() => {
                        handleRentClose();
                        handleBuyTicket(titleData);
                      }} 
                      className="bg-[#410e7b] hover:bg-purple-950 px-5 py-2 rounded-md text-white flex items-center gap-2 text-sm"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M4.5 3.5l11 6.5-11 6.5v-13z" />
                      </svg>
                      Buy Ticket
                    </button>
                  ) : (
                    <button 
                      onClick={() => handlePlay(titleData)}
                      className="bg-[#410e7b] hover:bg-purple-950 px-5 py-2 rounded-md text-white flex items-center gap-2 text-sm"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M4.5 3.5l11 6.5-11 6.5v-13z" />
                      </svg>
                      Play
                    </button>
                  )

                )

              )}



              {/* <button className="bg-[#410e7b] hover:bg-purple-950 border border-gray-700 px-2 py-2 rounded-md text-sm">
                <BookmarkPlus className="w-[20px] h-[20px]" />
              </button> */}
              
            </div>

            {/* small caption overlay like in screenshot */}
          </div>
        </div>


      </section>


      {/* Tabs section */}
      <section className="px-6 lg:px-8 py-8">
        
        <div className="container">
        
        <div className="bg-transparent border-b border-gray-800 pb-4">
          <div className="flex py-5 border-b border-gray-500">
            {titleData?.type === "tvSeries" && titleData?.seasons?.length ? (
              <>
                {/* Episodes Tab */}
                <button
                  onClick={() => setActiveTab("episodes")}
                  className={`px-6 py-2 rounded-l-sm border-r-2 border-white ${activeTab === "episodes"
                    ? "bg-purple-700 text-white"
                    : "bg-gray-800 text-gray-300"
                    }`}
                >
                  Episodes
                </button>

                {/* Cast Tab */}
                <button
                  onClick={() => setActiveTab("cast")}
                  className={`px-6 py-2 border-r-2 border-white ${activeTab === "cast"
                    ? "bg-purple-700 text-white"
                    : "bg-gray-800 text-gray-300"
                    }`}
                >
                  Cast
                </button>

                {/* Reviews Tab */}
                <button
                  onClick={() => setActiveTab("reviews")}
                  className={`px-6 py-2 rounded-r-sm ${activeTab === "reviews"
                    ? "bg-purple-700 text-white"
                    : "bg-gray-800 text-gray-300"
                    }`}
                >
                  Reviews
                </button>
              </>
            ) : (
              <>
                {/* Cast Tab */}
                <button
                  onClick={() => setActiveTab("cast")}
                  className={`px-4 py-2 rounded-l-sm border-r-2 border-white ${activeTab === "cast"
                    ? "bg-purple-700 text-white"
                    : "bg-gray-800 text-gray-300"
                    }`}
                >
                  Cast
                </button>

                {/* Reviews Tab */}
                <button
                  onClick={() => setActiveTab("reviews")}
                  className={`px-4 py-2 rounded-r-sm ${activeTab === "reviews"
                    ? "bg-purple-700 text-white"
                    : "bg-gray-800 text-gray-300"
                    }`}
                >
                  Reviews
                </button>
              </>
            )}
          </div>



          <div className="pt-6">


            {/* ---------------------- EPISODES TAB (Only for Series) ---------------------- */}
            {/* ---------------------- EPISODES TAB (Only for Series) ---------------------- */}
            {titleData?.type === "tvSeries" && activeTab === "episodes" && (
              <div className="space-y-6">

                {/* ---------------- SEASON TABS ---------------- */}
                <div className="flex gap-3 overflow-x-auto pb-2">
                  {titleData?.seasons?.map((season: any, index: number) => (
                    <button
                      key={season.id}
                      onClick={() => setActiveSeason(index)}
                      className={`px-4 py-2 ${activeSeason === index
                        ? "border-b-2 border-white text-white"
                        : "text-white"
                        }`}
                    >
                      Season {season.number}
                    </button>
                  ))}
                </div>

                {/* ---------------- EPISODE GRID ---------------- */}
                {/* <h3 className="text-lg font-semibold">
                  Episodes — Season {titleData?.seasons?.[activeSeason]?.number}
                </h3> */}

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">

                  {titleData?.seasons?.[activeSeason]?.getpayperwatch != null && (
                    <div className="relative h-[11.3rem]">
                      <h3 className="text-white text-lg">
                        Rent : Season {titleData?.seasons?.[activeSeason]?.number}
                      </h3>

                      <p className="text-white">
                        Renting this season gives you access to watch all episodes up to 3 times within
                      </p>

                      <button
                        onClick={() => payRent(titleData?.seasons?.[activeSeason])}
                        className="absolute bottom-0 w-full bg-purple-600 text-white rounded-md py-2">
                        Buy Full Seasons
                      </button>
                    </div>
                  )}


                  {titleData?.seasons?.[activeSeason]?.episodes?.map((ep: any) => (
                    <div
                      key={ep.id}
                      className="group relative rounded-lg overflow-hidden border border-gray-800 bg-[#0b0b0f]"
                    >

                      {/* Thumbnail Image */}
                      <img
                        src={ep.poster || "/default-episode.jpg"}
                        className="w-full h-36 object-cover"
                        alt={ep.name}
                      />

                      {/* Bottom Episode Name */}
                      <div className="p-2 text-sm font-medium text-gray-200">
                        {ep.name}
                      </div>

                      {/* Hover Overlay */}
                      <div
                        className="
              absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 
              flex items-center justify-center transition-opacity duration-300
            "
                      >

                        {titleData?.seasons?.[activeSeason]?.getpayperwatch != null ? (
                          <button
                            onClick={() => setVideoUrl(ep.videos?.[0]?.url || null)}
                            className="px-4 py-2 bg-purple-600 text-white rounded-md text-sm"
                          >
                            Buy Full Seasons
                          </button>
                        ) : (
                          <button
                            onClick={() => handlePlay(ep.videos)}
                            className="px-4 py-2 bg-purple-600 text-white rounded-md text-sm"
                          >
                            ▶ Play
                          </button>
                        )}




                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}



            {/* ---------------------- CAST TAB ---------------------- */}
            {activeTab === "cast" && (
              <div>
                <h3 className="text-lg font-semibold">Cast & Crew</h3>

                {/* Director / Writer */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                  <div className="p-4 bg-[#15202b] rounded-md text-sm text-purple-200">
                    <p className="font-semibold">
                      <span className="text-yellow-600">DIRECTOR</span>{" "}
                      {titleData?.director || "N/A"}
                    </p>
                    <p className="font-semibold">
                      <span className="text-yellow-600">WRITER</span>{" "}
                      {titleData?.writer || "N/A"}
                    </p>
                  </div>

                  {/* Cast List */}
                  {titleData?.casts?.length > 0 && (
                    <div>
                      {titleData.casts.map((c: any) => (
                        <div
                          key={c.id}
                          className="p-4 bg-[#15202b] rounded-md text-sm text-purple-200"
                        >
                          <h3 className="text-lg font-semibold">{c.person_name}</h3>
                          <p className="text-sm text-gray-300">
                            {c.person_character || "Character"}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>


                {/* Media List */}
                {/* {titleData?.videos?.length ? (
                  <div className="mt-6">
                    <h4 className="text-md font-semibold">Media</h4>

                    <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {titleData.videos.map((v: any) => (
                        <div
                          key={v.id}
                          className="p-3 bg-[#0b0b0f] rounded border border-gray-800 flex items-center justify-between"
                        >
                          <div>
                            <div className="font-medium">{v.name || "Clip"}</div>
                            <div className="text-xs text-gray-400">
                              {v.runtime ? `${v.runtime} sec` : ""}
                            </div>
                          </div>

                          <a
                            href={v.url}
                            className="text-sm text-indigo-400"
                            target="_blank"
                            rel="noreferrer"
                          >
                            Play
                          </a>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : null} */}
              </div>
            )}

            {/* ---------------------- REVIEWS TAB ---------------------- */}
            {activeTab === "reviews" && (
              <div className="p-4 border-t border-gray-800">




                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                  {/* ---------------- LEFT : REVIEWS LIST ---------------- */}
                  <div className="md:col-span-2 space-y-4 max-h-[450px] overflow-y-auto pr-2">
                    {reviewsData2.length > 0 ? (
                      reviewsData2.map((review, i) => (
                        <div
                          key={i}
                          className="border border-gray-700 bg-transparent rounded-lg p-4 flex gap-4"
                        >
                          {/* Avatar */}
                          {review?.user?.avatar_url ? (
                            <img
                              src={review.user.avatar_url}
                              className="w-12 h-12 rounded-full object-cover"
                              alt="user"
                            />
                          ) : (
                            <img
                              src="/images/usericon.png"
                              className="w-12 h-12 rounded-full object-cover"
                              alt="user"
                            />)
                          }

                          {/* Content */}
                          <div className="flex-1">
                            {/* Username + Rating + Time */}
                            <div className="flex justify-between items-center">
                              <div>
                                <h3 className="text-white font-semibold">{review?.user?.first_name} {review?.user?.last_name}</h3>

                                <div className="flex items-center gap-1 mt-1">
                                  <span className="bg-yellow-500 text-white px-2 py-0.5 rounded-sm text-xs font-bold flex items-center gap-1">
                                    <Star className='h-[13px] w-[13px] fill-white' /> {review.score}
                                  </span>
                                </div>
                              </div>

                              <span className="text-gray-400 text-sm">{dayjs(review.created_at).fromNow()}</span>
                            </div>

                            {/* Review Text */}
                            <p className="text-gray-300 mt-3">{review.body}</p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p>No reviews available.</p>
                    )}
                  </div>

                  <div>
                    <div className="border border-gray-700 bg-transparent rounded-lg p-4">
                      <div className='text-center'>
                        <h3 className='flex gap-3 items-center text-2xl justify-center mb-2'><Star className='h-[25px] w-[25px] fill-golden stroke-transparent' />
                          {totalReviewData?.averageRating
                            ? totalReviewData?.averageRating?.toFixed(1)
                            : 0} </h3>
                        <p className='font-medium text-md text-white mb-4'>
                          {totalReviewData?.totalRating} Ratings &{" "}
                          {totalReviewData?.totalReviews} Reviews</p>
                        <button onClick={handleShow} className='bg-[#410e7b] text-white rounded-md px-3 py-2 text-sm'>
                          WRITE A REVIEW +
                        </button>
                      </div>

                    </div>
                  </div>
                  {showModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center">

                      {/* Overlay */}
                      <div
                        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
                        onClick={handleClose}
                      ></div>

                      {/* Modal Panel */}
                      <div className="relative z-10 w-full max-w-lg bg-[#0e0e11] rounded-xl p-6 shadow-xl border border-gray-800 animate-fadeIn">

                        {/* Header */}
                        <div className="flex items-center justify-between mb-4">
                          <h2 className="text-lg font-semibold text-white">Write A Review</h2>
                          <button onClick={handleClose} className="text-gray-300 hover:text-white text-xl">✕</button>
                        </div>

                        {/* Rating Section */}
                        <div className="mb-4">
                          <label className="block text-sm text-gray-300 mb-1">Rating</label>

                          <div className="flex items-center gap-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                size={28}
                                onClick={() => setRating(star)}
                                onMouseEnter={() => setHover(star)}
                                onMouseLeave={() => setHover(null)}
                                className={`cursor-pointer transition
                                  ${(hover ?? rating) >= star
                                    ? "text-yellow-400 fill-yellow-400"
                                    : "text-gray-600"
                                  }`}
                              />
                            ))}
                          </div>
                        </div>

                        {/* Review Textarea */}
                        <div className="mb-6">
                          <label className="block text-sm text-gray-300 mb-1">Review</label>
                          <textarea
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            rows={4}
                            placeholder="Leave a comment here..."
                            className="w-full bg-[#0b0b0f] border border-gray-700 text-gray-200 rounded-md p-3 focus:ring-2 focus:ring-purple-600 outline-none"
                          ></textarea>
                        </div>

                        {/* Footer Buttons */}
                        <div className="flex justify-end gap-3">
                          <button
                            onClick={handleClose}
                            className="px-4 py-2 rounded-md bg-gray-800 text-gray-300 hover:bg-gray-700"
                          >
                            Cancel
                          </button>

                          <button
                            onClick={handleSubmitReview}
                            className="px-4 py-2 rounded-md bg-purple-700 hover:bg-purple-800 text-white"
                          >
                            Submit
                          </button>
                        </div>

                      </div>
                    </div>
                  )}

                </div>

              </div>

            )}
          </div>



        </div>


</div>






      </section>

      {Array.isArray(morelikethis) && morelikethis.length > 0 && (
        <section className="px-6 lg:px-8 pb-20">
          <div className="container mx-auto">
            <h2 className="text-xl font-semibold mb-6">More Like This</h2>


          <div className="relative">
            <button
              aria-label="prev"
              onClick={() => scrollBy(-420)}
              className="hidden sm:flex absolute left-0 top-1/2 -translate-y-1/2 z-20 h-10 w-10 items-center justify-center rounded-full bg-black/40 hover:bg-black/30">
              ‹
            </button>


            <div
              ref={carouselRef}
              className="flex gap-6 overflow-x-auto pb-4 scroll-smooth scrollbar-hide px-6 sm:px-12 overflow-x-hidden"
              style={{ scrollBehavior: "smooth" }}>
              {morelikethis.map((c) => (
                <div key={c.id} className="min-w-[220px] max-w-[220px] group relative rounded-lg overflow-hidden shadow-lg">
                  {/* Card image */}
                  <img src={c.tv_portrait_image} alt={c.title} className="w-full h-[320px] object-cover transform group-hover:scale-105 transition-transform duration-300" />


                  {/* Hover overlay that appears from bottom */}
                  <div className="absolute left-0 right-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-gradient-to-t from-black/85 to-transparent px-4 py-4">
                    <h3 className="text-sm font-semibold">{c.title}</h3>
                    <p className="text-xs text-gray-300 mt-1">{c.type}</p>
                    <div className="mt-3 flex items-center justify-between">
                      <button className="bg-purple-600 px-3 py-1 text-xs rounded">Watch</button>
                      {/* <div className="text-xs text-gray-400">2024 • 2hr</div> */}
                    </div>
                  </div>


                  {/* play small bg-video layer for each card (optional) - we simply place a semi-transparent overlay to suggest video */}
                  <div className="absolute inset-0 pointer-events-none bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              ))}
            </div>


            <button
              aria-label="next"
              onClick={() => scrollBy(420)}
              className="hidden sm:flex absolute right-0 top-1/2 -translate-y-1/2 z-20 h-10 w-10 items-center justify-center rounded-full bg-black/40 hover:bg-black/30">
              ›
            </button>
          </div>
          </div>

        </section>
      )}



      {selectedMovie && <TicketPurchaseDialog open={isTicketDialogOpen} onOpenChange={setIsTicketDialogOpen} movie={selectedMovie} />}


      < Footer />
    </div >
  );

};

export default Details;