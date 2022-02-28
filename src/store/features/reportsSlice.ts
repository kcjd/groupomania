import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit'

import api from '../../api/api'
import { ReportData } from '../../types/types'
import { RootState } from '../store'
import { getPosts } from './postsSlice'

export const addReport = createAsyncThunk<ReportData, number>('reports/addReport', async (postId) => {
  const { data: report } = await api.post(`posts/${postId}/reports`)
  return report
})

const reportsAdapter = createEntityAdapter<ReportData>({
  selectId: (report) => report.userId + '-' + report.postId
})

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
