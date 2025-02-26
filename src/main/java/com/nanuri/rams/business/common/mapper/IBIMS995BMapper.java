package com.nanuri.rams.business.common.mapper;

import com.nanuri.rams.business.batch.job.entity.BatchMasterVo;
import com.nanuri.rams.business.common.dto.IBIMS995BDTO;
import com.nanuri.rams.business.common.vo.IBIMS995BVO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface IBIMS995BMapper {

	public List<IBIMS995BVO> selectIBIMS995B(IBIMS995BDTO param);

	public int jobCount();

	public int insertIBIMS995B(IBIMS995BDTO param);

	public int updateIBIMS995B(IBIMS995BDTO param);

	public int deleteIBIMS995B(IBIMS995BDTO param);
	
	public List<BatchMasterVo> selectBatchMaster(String curDate);

	public List<BatchMasterVo> getBatchScheduleStatus(String date);

}
