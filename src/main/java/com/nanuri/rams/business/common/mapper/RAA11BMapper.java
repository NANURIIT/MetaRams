package com.nanuri.rams.business.common.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.nanuri.rams.business.common.dto.RAA11BDTO;
import com.nanuri.rams.business.common.vo.RAA11BVO;

@Mapper
public interface RAA11BMapper {
	
	// AS05110S - 안건관리 - 담당자 일괄변경
	public void insertOwnPEnoH(RAA11BDTO raa11bDTO);
	
	// AS05010S - 안건관리 - 진행정보관리 - 관리직원 조회
	List<RAA11BVO> getEnoList(RAA11BVO enoList);
	
	// AS05010S - 안건관리 - 진행정보관리 - 관리직원 등록
	public int registEnoInfo(RAA11BVO enoInfo);
	
	// AS05010S - 안건관리 - 진행정보관리 - 관리직원 수정
	public int updateEnoInfo(RAA11BVO enoInfo);
	
	// AS05010S - 안건관리 - 진행정보관리 - 관리직원 삭제
	public int deleteEnoInfo(RAA11BVO enoInfo);
	
	public int checkEno(RAA11BVO enoInfo);
}
