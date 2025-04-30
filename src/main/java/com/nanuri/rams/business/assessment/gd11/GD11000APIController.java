package com.nanuri.rams.business.assessment.gd11;

import com.nanuri.rams.business.common.dto.IBIMS001BDTO;
import com.nanuri.rams.business.common.vo.IBIMS001BVO;
import com.nanuri.rams.business.common.vo.GD11000SVO;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@Slf4j
@RequestMapping("/GD11000S")
@RequiredArgsConstructor
@RestController
public class GD11000APIController {
    
    private final GD11000Service service;

    // 코드구분 리스트 가져오기 (공통코드호출)
    @GetMapping(value = "/commonCodeInfo")
    public List<IBIMS001BVO> getCommonCodeInfo() {

        return service.getCommonCodeName();
    }

    // // 그룹코드정보 리스트 가져오기
    // @PostMapping(value = "/groupCodeInfoList")
    // public List<IBIMS001BDTO> getGrpCdInfo(@RequestBody IBIMS001BDTO paramData) {
    //     return service.getGrpCdInfo(paramData);
    // }

    // // 추가코드정보 리스트 가져오기
    // @PostMapping(value = "/addCodeInfoList")
    // public List<IBIMS002BVO> getAddCdInfo(@RequestBody IBIMS001BDTO paramData) {
    //     return service.getAddCdInfo(paramData);
    // }

    // 통합코드정보 리스트 한번에 가져오기
    @PostMapping(value = "/codeInfo")
    public GD11000SVO getCodeInfo(@RequestBody IBIMS001BDTO paramData) {
        log.debug("========== 조회성공 ==========");
        return service.getCodeInfo(paramData);
    }

    @PostMapping(value = "/saveCodeInfo")
	public int saveCodeInfo(@RequestBody GD11000SVO param) {
        // 내가 업데이트 할 테이블이 몇번이더라?? =>> GD11000S

        // IBIMS002B의 컬럼을 참조 가능한 클래스가 뭐더라?? ->> GD11000SVO

        // 받아야할 파라미터의 형태는 ??? => 

        // 임플로 가기 위해서는? >>> 서비스 거치기
        log.debug("========== 저장성공 ==========");
		return service.saveCodeInfo(param);
	}
    
}
