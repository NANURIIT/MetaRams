package com.nanuri.rams.business.common.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.nanuri.rams.business.common.vo.IBIMS010BVO.SchCondVO;
import com.nanuri.rams.business.common.vo.IBIMS010BVO.ArdyBzepVO;
import com.nanuri.rams.business.common.vo.IBIMS010BVO.ArdyBzepListVO;
import com.nanuri.rams.business.common.vo.IBIMS010BVO.ArdyBzepCdVO;


@Mapper
public interface IBIMS010BMapper {
		
	/**
	 * 기업체 정보 조회
	 * @param IBIMS010BVO$SchCondVO
	 * @return IBIMS010BVO$ArdyBzepVO
	 */
	public ArdyBzepVO selectArdyBzepInfo(SchCondVO param);
	
	/**
	 * 기업체 정보 목록 조회
	 * @param IBIMS010BVO$SchCondVO
	 * @return IBIMS010BVO$ArdyBzepListVO
	 */
	public List<ArdyBzepListVO> selectArdyBzepInfoList(SchCondVO param);
		
	/**
	 * 기업체 정보 등록
	 * @param IBIMS010BVO$ArdyBzepVO
	 * @return IBIMS010BVO$ArdyBzepVO [ 기업체번호 set]
	 */	
	public int insertArdyBzepInfo(ArdyBzepVO param);
	
	/**
	 * 기업체 정보 수정
	 * @param IBIMS010BVO$ArdyBzepVO
	 * @return int
	 */
	public int updateArdyBzepInfo(ArdyBzepVO param);
	
	/**
	 * 기업체 정보 사용여부 수정
	 * @param IBIMS010BVO$ArdyBzepVO
	 * @return int
	 */
	public int updateArdyBzepUseYn(ArdyBzepVO param);

	/**
	 * 기업체 사용여부 코드값
	 * @param IBIMS010BVO$SchCondVO
	 * @return IBIMS010BVO$ArdyBzepVO
	 */
	public List<ArdyBzepCdVO> selectCd(SchCondVO param);

}
