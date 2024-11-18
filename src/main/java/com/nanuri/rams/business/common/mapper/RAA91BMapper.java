package com.nanuri.rams.business.common.mapper;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.nanuri.rams.business.common.dto.RAA90BDTO;
import com.nanuri.rams.business.common.dto.RAA91BDTO;
import com.nanuri.rams.business.common.vo.RAA90BVO;

@Mapper
public interface RAA91BMapper {
	
	public List<Map<String, Object>> getSelectBox(String cmnsCdGrp);				// 셀렉트박스 코드, 밸류 취득
	
	public List<RAA91BDTO> getCodeInfoList(RAA90BDTO dto); 							// 코드정보 가져오기
	
	public List<RAA91BDTO> getCodeInfoList(String cmnsCdGrp);
	
	public int registCodeInfo(RAA90BVO.CodeInfoSaveRequestVO vo); 					// 코드정보 등록하기
	
	public int insertCodeInfo(RAA90BVO.CodeInfoSaveRequestVO vo);
	
	public Integer getMaxSeq(String cmnsCdGrp);
	
	public Optional<RAA91BDTO> getCodeInfo(@Param(value = "cmnsCdGrp") String cmnsCdGrp,
			 @Param(value = "cdVlId") String cdVlId);
	
	public int deleteCodeInfo(@Param(value = "cmnsCdGrp") String cmnsCdGrp, @Param(value = "hndlPEno") String hndlPEno,
			  @Param(value = "cdVlIds") List<String> cdVlIds);
	
}
