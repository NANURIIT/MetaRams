package com.nanuri.rams.business.admin.ac01.ac01110;

import java.util.List;

import com.nanuri.rams.business.common.dto.IBIMS003BDTO;
import com.nanuri.rams.business.common.vo.IBIMS003BVO;
import com.nanuri.rams.business.common.vo.IBIMS006BVO;
import org.springframework.stereotype.Service;

import com.nanuri.rams.business.common.dto.RAA92BDTO;
import com.nanuri.rams.business.common.dto.RAA94BDTO;
import com.nanuri.rams.business.common.dto.RAA99ADTO;
import com.nanuri.rams.business.common.vo.RAA92BVO;

@Service
public interface AC01110Service {
	
	/**
	 * 사용자 추가
	 * @param IBIMS003BDTO
	 */
	public void insertUser(IBIMS003BDTO userManageDTO);
	
	/**
	 * 사용자 수정
	 * @param IBIMS003BDTO
	 */
	public void updateUser(IBIMS003BDTO userUpdateDTO);
    
	/**
	 * 사용자 목록 조회
	 * @param IBIMS003BDTO
	 * @return
	 */
	public List<IBIMS003BVO> getUserList(IBIMS003BDTO paramData);
	
	/**
	 * 사용자 삭제(퇴사)
	 * @param IBIMS003BDTO
	 */
    public void deleteUser(IBIMS003BDTO paramData);
    
    /**
     * 사용자관리 화면의 권한구분
     * @return
     */
    public List<IBIMS006BVO> selectAuthCode();
    
	/**
	 * 사번 중복체크
	 * @param userVo
	 * @return
	 */
	public int checkEno(String eno);	// raa92b
	public int checkUserEno(String eno);	// raa99a

}
