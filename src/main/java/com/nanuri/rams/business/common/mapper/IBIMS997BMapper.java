package com.nanuri.rams.business.common.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.nanuri.rams.business.batch.job.entity.BatchMasterVo;
import com.nanuri.rams.business.common.dto.IBIMS997BDTO;
import com.nanuri.rams.business.common.vo.IBIMS997BVO;

@Mapper
public interface IBIMS997BMapper {

	public List<IBIMS997BVO> selectIBIMS997B(IBIMS997BDTO param);

	public IBIMS997BDTO getJobId(String param);

	public int jobCount(String param);

	public int batchMonitering(String param);

	public IBIMS997BDTO daemonCheckData(String param);

	public int subPreJobCount(IBIMS997BDTO param);

	public int insertIBIMS997B(IBIMS997BDTO param);

	public int updateIBIMS997B(IBIMS997BDTO param);

	public int jobStatusUpdate(IBIMS997BDTO param);

	public int batchCmdUpdate(IBIMS997BDTO param);

	public int deleteIBIMS997B(IBIMS997BDTO param);

	public int batchUpdate(IBIMS997BDTO param);

	// 배치 스케줄러 모니터링 초기화
	public int resetBatch(IBIMS997BDTO input);

	// 배치 스케줄러 모니터링 Confirm 수정
	public int updateConfirm(IBIMS997BDTO input); 

	// 배치 스케줄러 모니터링 Count
	public int count997(IBIMS997BDTO input);

	public void mergeBatchNotRunning(BatchMasterVo batch);

	public void updateJobStatus(@Param("curDate") String curDate, @Param("jobId") String jobId, @Param("jobStatus") String jobStatus);
	
	public IBIMS997BDTO selectJobScheduler(@Param("curDate") String curDate, @Param("jobId") String jobId);

	public List<IBIMS997BDTO> selectListPreBatch(@Param("curDate") String curDate, @Param("jobId") String jobId);

	public void updateBatchCmdDcd(@Param("curDate") String curDate, @Param("jobId") String jobId, @Param("batchCmdDcd") String batchCmdDcd);

	public void deleteBatchSchedule(BatchMasterVo data);
	
}
