package com.nanuri.rams.business.admin.ac01.ac01110;

import java.util.List;

import com.nanuri.rams.business.common.dto.IBIMS003BDTO;
import com.nanuri.rams.business.common.vo.IBIMS003BVO;
import com.nanuri.rams.business.common.vo.IBIMS006BVO;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.nanuri.rams.business.common.dto.RAA92BDTO;
import com.nanuri.rams.business.common.dto.RAA94BDTO;
import com.nanuri.rams.business.common.dto.RAA99ADTO;
import com.nanuri.rams.business.common.vo.RAA92BVO;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@RestController
public class AC01110APIController {
	
	private final AC01110Service service;
	

//	/* 사용자 권한 추가 */
//	@PostMapping(value = "/insertUser")
//	public void insertUser(@RequestBody IBIMS003BDTO userManageDTO) {
//		service.insertUser(userManageDTO);
//	};
//
//	/* 사용자 권한 수정 */
//	@PostMapping(value = "/updateUser")
//	public void updateUser(@RequestBody IBIMS003BDTO userUpdateDTO) {
//		service.updateUser(userUpdateDTO);
//	};
//
//	/* 사번 중복체크 raa92b*/
//	@PostMapping(value = "/checkEno")
//	public int checkEno(@RequestBody String eno) {
//		return service.checkEno(eno);
//	}
//
//	/* 사번 중복체크 raa99a */
//	@PostMapping(value = "/checkUserEno")
//	public int checkUserEno(@RequestBody String eno) {
//		return service.checkEno(eno);
//	}
//
//	/* 사용자 목록조회 */
//	@GetMapping(value = "/getUserList")
//	public List<IBIMS003BVO> getUserList(IBIMS003BDTO paramData) {
//		return service.getUserList(paramData);
//	}
//
//	/* 사용자 삭제(퇴사) */
//	@PatchMapping(value = "/deleteUser")
//	public void deleteUser(@RequestBody IBIMS003BDTO paramData) {
//		service.deleteUser(paramData);
//	}
//
//	/* 사용자관리화면 권한구분 */
//	@GetMapping(value = "/selectAuthCode")
//	public List<IBIMS006BVO> selectAuthCode() {
//		return service.selectAuthCode();
//	}


}
