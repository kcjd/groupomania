import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit'

import api from '../../api/api'
import { ApiResponse, ReportData } from '../../types/types'
import { RootState } from '../store'
import { getPosts } from './postsSlice'

interface ReportResponse extends ApiResponse {
  report: ReportData
}

export const addReport = createAsyncThunk('reports/addReport', async (postId: number) => {
  const response = await api.post<ReportResponse>(`posts/${postId}/reports`)
  return response.data.report
})

const selectId = (report: ReportData) => report.userId + '-' + report.postId

const reportsAdapter = createEntityAdapter<ReportData>({ selectId })

export const reportsSlice = createSlice({
  name: 'reports',
  initialState: reportsAdapter.getInitialState(),
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(getPosts.fulfilled, (state, { payload }) => {
        const reports = payload.map((post) => post.reports).flat()
        reportsAdapter.addMany(state, reports)
      })
      .addCase(addReport.fulfilled, (state, { payload }) => {
        reportsAdapter.addOne(state, payload)
      })
})

export const { selectAll: selectAllReports } = reportsAdapter.getSelectors<RootState>(({ reports }) => reports)

export const selectReportsByPost = (state: RootState, postId: number | undefined) => {
  return selectAllReports(state).filter((report) => report.postId === postId)
}

export default reportsSlice.reducer
