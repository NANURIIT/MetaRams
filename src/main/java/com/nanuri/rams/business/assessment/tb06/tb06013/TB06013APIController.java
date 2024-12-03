package com.nanuri.rams.business.assessment.tb06.tb06013;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;
import com.nanuri.rams.business.common.dto.IBIMS213BDTO;
import com.nanuri.rams.business.common.vo.IBIMS115BVO;
import com.nanuri.rams.business.common.vo.TB06013PVO;


import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;


@Slf4j
@RequestMapping("/TB06013P")
@RequiredArgsConstructor
@RestController
public class TB06013APIController {

	private final TB06013Service tb06013Service;

	// 상품코드 리스트 등록
	@PostMapping(value = "/registMtrt")
	public String registMtrt(@RequestBody TB06013PVO searchParam) {
		return tb06013Service.registMtrt(searchParam);
	}

	// 상품코드 리스트 수정
	@PostMapping(value = "/modifyMtrt")
	public int modifyMtrt(@RequestBody TB06013PVO searchParam) {
		return tb06013Service.modifyMtrt(searchParam);
	}

	// 상품코드 리스트 삭제
	@PostMapping(value = "/removeMtrt")
	public int removeMtrt(@RequestBody TB06013PVO searchParam) {
		return tb06013Service.removeMtrt(searchParam);
	}
	
	// 상품코드 리스트 연결
	@PostMapping(value = "/connectMrtgInfo")
	public int connectMrtgInfo(TB06013PVO searchParam) {
		return tb06013Service.connectMrtgInfo(searchParam);
	}
	
	// 상품코드 리스트 연결종료
	@PostMapping(value = "/disConnectMrtgInfo")
	public int disConnectMrtgInfo(TB06013PVO searchParam) {
		return tb06013Service.disConnectMrtgInfo(searchParam);
	}
	
	//선순위정보 가져오기
	@PostMapping(value = "/prfdRankInfo")
	public List<IBIMS213BDTO> prfdRankInfo(IBIMS213BDTO dtoParam) {
		return tb06013Service.prfdRankInfo(dtoParam);
	}

}
