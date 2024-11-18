package com.nanuri.rams.business.admin.ac01.ac01010;

import java.text.ParseException;
import java.util.List;

import org.springframework.stereotype.Service;

import com.nanuri.rams.business.common.vo.IBIMS001BVO;
import com.nanuri.rams.business.common.vo.IBIMS002BVO;

@Service
public interface AC01010Service {
	
	/**
	 * 조회할 코드구분(코드이름) 가져오기		
	 * @return
	 */
	public List<IBIMS001BVO> getCommonCodeName(); 
	
	/**
	 * 그룹코드정보 리스트 가져오기
	 * @param cmnsCdGrp
	 * @return
	 * @throws ParseException
	 */
	public List<IBIMS001BVO> getGroupCodeInfoList(String cmnsCdGrp) throws ParseException;

	/**
	 * 코드정보 가져오기
	 * @param groupCodeInfoVo
	 * @return
	 */
	public List<IBIMS002BVO> getCodeInfoList(String cmnsCdGrp) throws ParseException;
	
	/**
	 * 그룹코드정보 등록하기
	 * @param requestDtos
	 * @return
	 */
	public boolean registGroupCodeInfo(List<IBIMS001BVO> requestDtos); 					

	public boolean deleteGroupCodeInfo(List<String> cmnsCdGrp);
	
	/**
	 * 코드정보 등록하기
	 * @param vo
	 * @return
	 */
	public boolean registCodeInfo(List<IBIMS002BVO> vo);

	public boolean deleteCodeInfo(IBIMS002BVO requestDto);
	
												

}
