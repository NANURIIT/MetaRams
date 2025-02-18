package com.nanuri.rams.business.common.mapper;

import com.nanuri.rams.business.common.dto.IBIMS996BDTO;
import com.nanuri.rams.business.common.vo.IBIMS996BVO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface IBIMS996BMapper {

	public List<IBIMS996BVO> selectIBIMS996B(IBIMS996BDTO param);

	public String getPreJobId(String param);

	public int insertIBIMS996B(IBIMS996BDTO param);

	public int updateIBIMS996B(IBIMS996BDTO param);

	public int deleteIBIMS996B(String param);

	/**
	 * 선행 job 리스트
	 * @param param
	 * @return
	 */	
	public List<IBIMS996BDTO> inqPreJob( String param );

	/**
	 * 선행 JOB 유무 확인
	 */
	public int cntPreJob (IBIMS996BDTO param);

}
