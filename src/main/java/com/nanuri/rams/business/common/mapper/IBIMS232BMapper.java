package com.nanuri.rams.business.common.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.nanuri.rams.business.common.dto.IBIMS231BDTO;
import com.nanuri.rams.business.common.dto.IBIMS232BDTO;
import com.nanuri.rams.business.common.vo.IBIMS232BVO;

@Mapper
public interface IBIMS232BMapper {
	
	/**
 	 * 결재담당자 입력
	 * @param paramData
	 * @return
	 */
	public int apvlRqst (IBIMS232BDTO paramData);

	/**
	 * 승인상태관리
	 */
	public int updateDecd (IBIMS232BDTO paramData);

	/**
	 * 결재순번 가져오기
	 */
	public int getDecdSq (IBIMS232BDTO paramData);

	/**
	 * 결재내역조회 TB06080S 에서 승인요청내역 선택시 해당 승인요건에 맞는 승인자 리스트 출력
	 */
	public List<IBIMS232BVO> dcfcList (IBIMS231BDTO paramData);

}