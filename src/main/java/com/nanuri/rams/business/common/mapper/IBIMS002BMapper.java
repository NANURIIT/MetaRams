package com.nanuri.rams.business.common.mapper;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.nanuri.rams.business.common.dto.IBIMS001BDTO;
import com.nanuri.rams.business.common.dto.IBIMS002BDTO;
import com.nanuri.rams.business.common.vo.GD11000SVO;
import com.nanuri.rams.business.common.vo.IBIMS001BVO;
import com.nanuri.rams.business.common.vo.IBIMS002BVO;

@Mapper
public interface IBIMS002BMapper {
	
	public List<IBIMS002BVO> getCodeInfoList(String cmnsCdGrp);						// 코드정보 가져오기
	
	public List<Map<String, Object>> getSelectBox2(String cmnsCdGrp);				// 셀렉트박스 코드, 밸류 취득

	List<Map<String, Object>> getSelectBoxList(List<String> listParam);				// 공통코드
	
	public int registCodeInfo(IBIMS002BDTO paramData); 										// 코드정보 등록하기
	
	public int insertCodeInfo(IBIMS002BDTO paramData);
	
	public Integer getMaxSeq(String cmnsCdGrp);
	
	public Optional<IBIMS002BVO> getCodeInfo(@Param(value = "cmnsCdGrp") String cmnsCdGrp,
			@Param(value = "cdVlId") String cdVlId);
	
	public List<Map<String, Object>> getSelectBox(String cmnsCdGrp);				// 셀렉트박스 코드, 밸류 취득
	
	public int deleteCodeInfo(@Param(value = "cmnsCdGrp") String cmnsCdGrp, 
								@Param(value = "hndEmpno") String hndEmpno,
								@Param(value = "cdVlIds") List<String> cdVlIds);

	public int updtUseYn(IBIMS002BDTO paramData);	// 사용여부 변경시 바뀌는 행 갯수		
	
	// GD11000S 추가코드
	public List<IBIMS002BVO> getAddCdInfo(IBIMS001BDTO paramData);

	// GD11000S 저장, update라서 int로 
	public int saveCodeInfo(IBIMS002BVO param);

}
