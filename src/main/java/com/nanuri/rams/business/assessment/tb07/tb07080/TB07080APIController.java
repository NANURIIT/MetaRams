package com.nanuri.rams.business.assessment.tb07.tb07080;

import java.util.List;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nanuri.rams.business.assessment.tb07.tb07080.TB07080Service;
import com.nanuri.rams.business.common.dto.IBIMS204BDTO;
import com.nanuri.rams.business.common.dto.IBIMS402BDTO;
import com.nanuri.rams.business.common.vo.IBIMS402BVO;
import com.nanuri.rams.business.common.vo.IBIMS404BVO;
import com.nanuri.rams.business.common.vo.TB06015SVO;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;


@Slf4j
@RequestMapping("/TB07080S")
@RequiredArgsConstructor
@RestController
public class TB07080APIController {
    

    private final TB07080Service tb07080service;

    @PostMapping(value = "/getExcData")
    public IBIMS402BVO selectOneIBIMS402B(@RequestBody IBIMS402BVO data) {
        return tb07080service.selectOneIBIMS402B(data);
    }

    @PostMapping(value = "/updateExcData")
    public int uptExcInfo(@RequestBody IBIMS402BDTO data) {
        return tb07080service.uptExcInfo(data);
    }

    @PostMapping(value = "/getIntrtData")
    public List<IBIMS404BVO> getIntrRateInfos(@RequestBody TB06015SVO data) {
        return tb07080service.getIntrRateInfos(data);
    }

    @PostMapping(value = "/getExcSnTB07080S")
	public List<String> getExcSnTB06015P(@RequestBody String prdtCd) {
		return tb07080service.getExcSnTB06015P(prdtCd);
	}

    @PostMapping(value = "/insertIntrtData")
	public int insertListIBIMS404B(@RequestBody TB06015SVO paramData) {
		return tb07080service.insertListIBIMS404B(paramData);
	}

    @PostMapping(value = "/updateIntrtData")
	public int updateListIBIMS404B(@RequestBody TB06015SVO paramData) {
		return tb07080service.updateListIBIMS404B(paramData);
	}

    @PostMapping(value = "/deleteIBIMS404B")
	public int deleteIBIMS404B(@RequestBody TB06015SVO paramData) {
		return tb07080service.deleteIBIMS404B(paramData);
	}

}
