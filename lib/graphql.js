import { GraphQLClient as GraphQLClientInstence } from "graphql-request";
import Cookies from "js-cookie";
// const endpoint = "https://backend.hillypix.com/public/graphql";
const endpoint = "https://stageconsole.hillypix.com/public/graphql";
const graphQLClient = new GraphQLClientInstence(endpoint, {
  cache: "no-store",
});

export const requestWithToken = async (
  query,
  variables = {},
  serverUserToken = null,
  noCache = true
) => {
  const userToken = Cookies.get("UserToken")
    ? Cookies.get("UserToken")
    : serverUserToken;
  const graphQLClient = new GraphQLClientInstence(endpoint, {
    headers: {
      Authorization: userToken ? `Bearer ${userToken}` : "",
      "Content-Type": "application/json",
    },
  });
  try {
    return await graphQLClient.request(query, variables);
  } catch (error) {
    console.error("GraphQL Request Error:", error);
    throw error; // Re-throw the error for further handling if necessary
  }
};

export async function getHomePage(user_id) {
  const query = `
    query GetHomePage($user_id: Int) {
          getHomePage(user_id: $user_id) {
        data {
          banner {
            id
            name
            title_id
            title {
              id
              title
              release_date
              statement
              new_release
              overview
              trailer_video_url
              type
              language
              genres 
              total_seasons_count
              total_reviews_count
              tv_banner
              tv_portrait_image
              tv_landscape_image
              review_avg
              slug
            }
          }
          list {
            id
            name
            description
            user_id
            auto_update_id
            listable {
              id
              list_id
              title_id
              listable_type
              order
              title {
                id
                title
                new_release
                overview
                trailer_video_url
                type
                language
                genres
                tv_banner
                tv_portrait_image
                tv_landscape_image
                runtime
                slug
                is_title_rent_by_user
                getpayperwatch {
                    id
                    title_id
                    amount
                    duration
                }
              }
            }
          }
        }
        status
        message
      }
    }
  `;

  const variables = {
    user_id: user_id ? Number(user_id) : null,
  };

  try {
    const response = await graphQLClient.request(query, variables);
    return response;
  } catch (error) {
    console.error("Error fetching data:", error);
    return { error: "Failed to fetch data" };
  }
}




export async function getContinueWatching(user_id, UserToken) {
  const query = `
    query continueWatching($user_id: Int,$type: String) {
      continueWatching(user_id: $user_id, type: $type) {
        data {
          id
          user_id
          time
          title_id
          video_id
          title {
            id
            title
            type
            language
            genres
            total_seasons_count
            total_reviews_count
            tv_banner
            tv_portrait_image
            tv_landscape_image
            review_avg
            runtime
            slug
            is_title_rent_by_user
            videos {
              id
              type
              url
              runtime
            }
             getpayperwatch {
              id
              title_id
              amount
              duration
            }
          }
          video {
            id
            type
            url
            runtime
             videoResumePositions {
                      id
                      user_id
                      title_id
                      time
                      } 
            episodes {
              id
              name
              video_id
              episode_number
              seasons {
                id
                number
              }
            }
          }
          more_like_this {
            id
            title
            genres
          }
        }
        status
        message
      }
    }
  `;

  const variables = {
    user_id: Number(user_id),
    type: "",
  };

  try {
    if (!!user_id) {
      return await requestWithToken(query, variables, UserToken);
    } else {
      return [];
    }
  } catch (error) {
    console.error("Error fetching continue watching data:", error);
    return { error: "Failed to fetch continue watching data" };
  }
}

export async function getAutoPlayVideo(
  titleId,
  videoId,
  user_id,
  episode_id = null,
  isEpisode = null
) {
  const query = `
    query AutoPlayNextVideo($video_id: Int, $title_id: Int, $user_id: Int, $season_id: Int, $episode_id: Int) {
      autoPlayNextVideo(video_id: $video_id, title_id: $title_id, user_id: $user_id, season_id: $season_id, episode_id: $episode_id) {
      data {
          title {
            id
            slug
            title
            type
            genres
            trailer_video_url
            overview
            language
            statement
            content_warning
            certification
            tv_banner
            tv_portrait_image
            tv_landscape_image
            release_date
            total_seasons_count
            total_reviews_count
            review_avg
            videos {
              id
              title_id
              name
              url
              slug
              runtime
              thumbnail
              videoResumePositions {
              id
              user_id
              title_id
              time
               } 
            }
            casts {
              id
              person_name
              person_character
              title_id
              image
            }
            seasons {
              id
              release_date
              poster
              number
              title_id
              episode_count
              episodes {
                id
                slug
                name
                description
                poster
                release_date
                season_id
                video_id
                title {
                  id
                  slug
                  title
                  overview
                  trailer_video_url
                  type
                  language
                  tv_banner
                  tv_portrait_image
                  tv_landscape_image
                }
                video {
                  id
                  name
                  thumbnail
                  url
                  type
                  quality
                  title_id
                  language
                  runtime
                  advertisement_video
                  is_paid
                  category
                  videoResumePositions {
                      id
                      user_id
                      title_id
                      time
                      } 
                }
              }
            }
          }
          episode { 
            id
            title_id
            name
            poster
             video
              {
              id
               name
                title_id
                url
                 } 
                seasons{ 
                id 
                name
                poster
                 }
                 }
        }
        status
        message
      }
    }
  `;

  const variables = {
    // video_id: Number(videoId),
    title_id: Number(titleId),
    user_id: Number(user_id),
  };

  if (isEpisode) {
    variables.episode_id = Number(episode_id);
    variables.season_id = Number(videoId);
  }

  try {
    return await requestWithToken(query, variables);
  } catch (error) {
    console.error("Error fetching continue watching data:", error);
    return { error: "Failed to fetch continue watching data" };
  }
}

export async function getTitleDetail(slug, user_id = null ) { 
  const query = `
    query GetTitleDetail($slug: String, $user_id: Int) {
      getTitleDetail(slug: $slug, user_id: $user_id) {
        data {
          title {
            id
            slug
            title
            isLiked
            type
            genres
            trailer_video_url
            overview
            language
            director
            writer
            statement
            content_warning
            certification
            tv_banner
            tv_portrait_image
            tv_landscape_image
            release_date
            total_seasons_count
            total_reviews_count
            review_avg
            is_title_rent_by_user
            getpayperwatch {
             id
             title_id
             amount
             duration
            }
            videos {
              id
              title_id
              name
              url
              runtime
              thumbnail
              videoResumePositions {
              id
              user_id
              title_id
              time
               } 
            }
            casts {
              id
              person_name
              person_character
              title_id
              image
            }
            seasons {
              id
              release_date
              poster
              number
              title_id
              episode_count
               is_title_rent_by_user
                getpayperwatch {
                id
                title_id
                amount
                duration
                }
              episodes {
                id
                slug
                name
                description
                poster
                release_date
                season_id
                video_id
                title {
                  id
                  slug
                  title
                  overview
                  trailer_video_url
                  type
                  language
                  tv_banner
                  tv_portrait_image
                  tv_landscape_image
                }
                video {
                  id
                  name
                  thumbnail
                  url
                  type
                  quality
                  title_id
                  language
                  runtime
                  advertisement_video
                  is_paid
                  category
                  videoResumePositions {
                      id
                      user_id
                      title_id
                      time
                      } 
                }
              }
            }
          }
          more_like_this {
              id
              slug
              title
              overview
              trailer_video_url
              type
              language
              genres
              tv_banner
              tv_portrait_image
              tv_landscape_image
            videos {
              id
              title_id
              name
              thumbnail
              url
            }
            casts {
              id
              person_name
              person_character
              title_id
            }
            seasons {
              id
              release_date
              poster
              number
              title_id
              episode_count
              episodes {
                id
                name
                description
                poster
                release_date
                season_id
                video_id
                video {
                  id
                  name
                  thumbnail
                  url
                  type
                  quality
                  title_id
                  language
                  runtime
                  advertisement_video
                  is_paid
                  category
                }
              }
            }
          }
        }
        status
        message
      }
    }
  `;

  const variables = {
    slug: slug,
    user_id: user_id ? Number(user_id) : "",
  };

  try {
    const response = await graphQLClient.request(query, variables);
    return response;
  } catch (error) {
    console.error("Error fetching data:", error);
    return { error: "Failed to fetch data" };
  }
}

export async function getReviewList(title_id) {
  const query = `
    query GetReviewList($title_id: Int) {
      getReviewList(title_id: $title_id) {
        data {
          id
          title_id
          body
          score
          created_at
          user {
            id
            first_name
            last_name
            avatar_url
          }
        }
        aggregates 
        { 
        totalRating 
        totalReviews
        averageRating
        }
        status
        message
      }
    }
  `;

  const variables = {
    title_id: title_id,
  };

  try {
    const response = await graphQLClient.request(query, variables);
    return response;
  } catch (error) {
    console.error("Error fetching data:", error);
    return { error: "Failed to fetch data" };
  }
}

export async function getListData(type, language) {
  const query = `
  query GetAppBanner($type: String, $language: String) {
    getAppBanner(type: $type, language: $language) {
      data {
        id
        name
        title_id
        title {
          id
          title
          description
          poster
          trailer_video_url
          type
          language
        }
      }
      status
      message
    }
  }
`;

  const variables = {
    type: type,
    language: language,
  };

  try {
    const response = await graphQLClient.request(query, variables);
    return response;
  } catch (error) {
    console.error("Error fetching data:", error);
    return { error: "Failed to fetch data" };
  }
}

export async function getListingData(type, language) {
  const query = `
  query GetAppHomePage($type: String, $language: String) {
    getAppHomePage(type: $type, language: $language) {
      data {
        list {
          id 
          name 
          description 
          user_id 
          auto_update_id 
          listable {
            id 
            list_id 
            title_id 
            listable_type 
            order 
            title {
              id 
              title 
              overview 
              trailer_video_url 
              type 
              language 
              poster 
              backdrop 
              app_banner_image 
              app_list_image 
              app_clip_image
            }
          }
        }
      }
      status 
      message
    }
  }`;

  const variables = {
    type: type, // using the passed argument
    language: language, // using the passed argument
  };

  try {
    const response = await graphQLClient.request(query, variables);
    return response;
  } catch (error) {
    console.error("Error fetching data:", error);
    return { error: "Failed to fetch data" };
  }
}

export async function registerUser(input) {
  const mutation = `
    mutation register($input: RegisterUserInput!) {
      register(input: $input) {
        user {
          id
          first_name
          last_name
          email
          mobile_number
          country_code
        }
        status
         message{
          email
          mobilenumber  
          success 
          error
        }
      }
    }
  `;

  return await requestWithToken(mutation, { input });
}

export async function loginUser(input) {
  const mutation = `
    mutation login($input: LoginUserInput!) {
      login(input: $input) {
        user {
          id
          mobile_number
          country_code
        }
        status
        message
      }
    }
  `;

  return await requestWithToken(mutation, { input });
}

export async function verifyLoginOtp(input) {
  const mutation = `
    mutation verifyloginotp($input: VerifyLoginInput!) {
      verifyloginotp(input: $input) {
        status
        message
        show_logout_button
        data {
          token
          UserDetails {
            id
            first_name
            last_name
            email
            avatar_url
            is_subscribe
            mobile_number
            country_code
            current_device_token
          }
        }
        login_devices { 
          id 
          user_id 
          token 
          device_type 
          device_name 
        }
      }
    }
  `;
  return await requestWithToken(mutation, { input });
}

export async function logoutDevice(input, token) {

  const mutation = `
    mutation logoutDevice($input: logoutDeviceInput!) {
      logoutDevice(input: $input) {
        status
        message
      }
    }
  `;
  return await requestWithToken(mutation, { input }, token);
}

export async function checkSessionStatus(input, token) {

  const mutation = `
    mutation checkSessionStatus($input: checkSessionStatusInput!) {
      checkSessionStatus(input: $input) {
        status message is_active userstatus
      }
    }
  `;
  return await requestWithToken(mutation, { input }, token);
}

export const saveReview = async (input) => {
  const mutation = `
    mutation saveReview($input: saveReviewInput!) {
      saveReview(input: $input) {
        data {
          id
          title_id
          body
          score
          user_id
          created_at
          updated_at
        }
        status
        message
      }
    }
  `;

  return await requestWithToken(mutation, { input });
};

export async function searchByTitle(user_id=null,title) {
  const query = `
  query SearchTitle($user_id: String,$title: String)
      {
      searchTitle(user_id: $user_id,title: $title)
            { 
                data
                  { 
                  id
                  slug
                  title
                  new_release
                  genres
                  trailer_video_url
                  tv_landscape_image
                  tv_portrait_image
                  type
                  tv_banner
                  is_title_rent_by_user
                  getpayperwatch
                  {
                    id
                    title_id
                    amount
                    duration
                  }
                  } 
              status
              message 
          } 
      }`;

  const variables = {
    user_id: user_id,
    title: title,
  };

  try {
    const response = await graphQLClient.request(query, variables);
    return response;
  } catch (error) {
    console.error("Error fetching data:", error);
    return { error: "Failed to fetch data" };
  }
}

// export async function getWatchListData(input) {
//   const query = `
//     query GetWatchList($type: String, $user_id: Int) {
//       getWatchList(type: $type, user_id: $user_id) {
//         data {
//           id
//           title_id
//           user_id
//           title {
//             id
//             title
//             poster
//             app_list_image
//             language
//             runtime
//             genres
//             type
//             review {
//               id
//               score
//               user_id
//             }
//           }
//         }
//         status
//         message
//       }
//     }
//   `;

//   return await requestWithToken(query, {input} );
// }

export async function getWatchListData(user_id, type) {
  const query = `
    query GetWatchList($type: String, $user_id: Int) {
      getWatchList(type: $type, user_id: $user_id) {
        data {
          id
          title_id
          user_id
          title {
            id
            slug
            title
            poster
            app_list_image
            language
            runtime
            genres
            type
            trailer_video_url
            tv_banner
            tv_landscape_image
            tv_portrait_image
            is_title_rent_by_user
            getpayperwatch {
                    id
                    title_id
                    amount
                    duration
                }
          }
        }
        status
        message
      }
    }
  `;

  const variables = {
    user_id: user_id,
    type: type,
  };
  return await requestWithToken(query, variables);
}

export async function addToWatchList(input, userToken) {
  const mutation = `
  mutation  AddWatchList($input: addWatchListInput) { 
        addWatchList(input: $input) { 
              data { 
                  id
                  title_id
                  user_id 
                  } 
                  status
                  message 
                  }
                }`;

  return await requestWithToken(mutation, { input }, userToken);
}
export async function titleLikeSave(input, userToken) {
  const mutation = `
  mutation TitleLikeSave($input: titleLikeSaveInput!) { 
  titleLikeSave(input: $input) {
   data {
    id 
    title_id
    user_id 
    } 
    status 
    message } }`;

  return await requestWithToken(mutation, { input }, userToken);
}

export async function restoreUser(input, userToken) {
  const mutation = `
    mutation RestoreUser($input: restoreUserInput) {
      restoreUser(input: $input) {
        data {
          id
          first_name
          last_name
        }
        status
        message
      }
    }
  `;
  return await requestWithToken(mutation, { input }, userToken);
}

export async function handleCheckWatchlist(input, userToken) {
  const query = `
  query checkUserWatchList($title_id: Int!, $user_id: Int!) { 
        checkUserWatchList(title_id: $title_id, user_id: $user_id) { 
                  is_added_watchlist
                  status
                  message 
                  }
                }`;
  const { title_id, user_id } = input;
  return await requestWithToken(query, { title_id, user_id }, userToken);
}

export const deleteAccountOtp = async ({ id,country_code }) => {
  const mutation = `
    mutation DeleteAccountOtp($input: deleteAccountOtpInput!) {
      deleteAccountOtp(input: $input) {
        status
        message
      }
    }
  `;

  const variables = {
    input: {
      mobile_number: id,
      country_code:country_code
    },
  };

  return await requestWithToken(mutation, variables);
};

export const verifyDeleteAccountOtp = async ({ id,country_code,otp }) => {
  const mutation = `
    mutation VerifyDeleteAccountOtp($input: verifyDeleteAccountOtpInput!) {
      verifyDeleteAccountOtp(input: $input) {
        status
        message
      }
    }
  `;

  const variables = {
    input: {
      mobile_number: id,
      country_code:country_code,
      otp:otp
    },
  };

  return await requestWithToken(mutation, variables);
};


export const deleteUser = async ({ id }) => {
  const mutation = `
    mutation DeleteUser($input: deleteUserInput!) {
      deleteUser(input: $input) {
        data {
          id
          first_name
          last_name
        }
        status
        message
      }
    }
  `;

  const variables = {
    input: {
      id: id, // make sure this matches the expected input
    },
  };

  return await requestWithToken(mutation, variables);
};

export async function removeFromWatchlist(input, userToken) {
  const mutation = `
  mutation  DeleteWatchList($input: deleteWatchInput) { 
        deleteWatchList(input: $input) { 
              data { 
                  id
                  title_id
                  user_id 
                  } 
                  status
                  message 
                  }
                }`;

  return await requestWithToken(mutation, { input }, userToken);
}
export const updateUserProfile = async (input, userToken) => {
  const mutation = `
    mutation UpdateUserProfile($input: updateUserProfileInput) {
      updateUserProfile(input: $input) {
        data {
          id
          first_name
          last_name
          avatar_url
        }
        status
        message
      }
    }
  `;

  return await requestWithToken(mutation, { input }, userToken);
};
