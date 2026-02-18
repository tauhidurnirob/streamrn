import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  mapEpisodeDtoToEpisode,
  mapShowDtoToShow,
  mapSearchResultDtoToShow,
  mapCastDtoToCastMember,
} from './tvmazeMappers';
import { TvMazeShowDto, TvMazeEpisodeDto, TvMazeSearchResultDto, TvMazeCastDto } from './tvmazeTypes';
import Show from '../../domain/entities/Show';
import Episode from '../../domain/entities/Episode';
import CastMember from '../../domain/entities/CastMember';

export const tvmazeApi = createApi({
  reducerPath: 'tvmazeApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.tvmaze.com' }),
  endpoints: (builder) => ({
    searchShows: builder.query<Show[], string>({
      query: (q) => `/search/shows?q=${encodeURIComponent(q)}`,
      transformResponse: (res: TvMazeSearchResultDto[]) => res.map(mapSearchResultDtoToShow),
    }),
    getShow: builder.query<Show, number>({
      query: (id) => `/shows/${id}`,
      transformResponse: (res: TvMazeShowDto) => mapShowDtoToShow(res),
    }),
    getShowEpisodes: builder.query<Episode[], number>({
      query: (showId) => `/shows/${showId}/episodes`,
      transformResponse: (res: TvMazeEpisodeDto[]) => res.map(mapEpisodeDtoToEpisode),
    }),
    getShowCast: builder.query<CastMember[], number>({
      query: (showId) => `/shows/${showId}/cast`,
      transformResponse: (res: TvMazeCastDto[]) => res.map(mapCastDtoToCastMember),
    }),
  }),
});

export const { useSearchShowsQuery, useGetShowQuery, useGetShowEpisodesQuery, useGetShowCastQuery } = tvmazeApi;

export default tvmazeApi;
