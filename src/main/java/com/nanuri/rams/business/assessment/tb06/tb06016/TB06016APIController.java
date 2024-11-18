package com.nanuri.rams.business.assessment.tb06.tb06016;

import java.util.List;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nanuri.rams.business.common.dto.IBIMS204BDTO;
import com.nanuri.rams.business.common.vo.IBIMS204BVO;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequestMapping("/TB06016P")
@RequiredArgsConstructor
@RestController
public class TB06016APIController {

    private final TB06016Service tb06016service;

    @PostMapping(value = "/getMdwyRdmpFeeRto")
    public List<IBIMS204BDTO> selectIBIMS204B(@RequestBody IBIMS204BDTO data) {
        return tb06016service.selectIBIMS204B(data);
    }

    @PostMapping(value = "/insertMdwyRdmpFeeRto")
    public int insertIBIMS204B(@RequestBody IBIMS204BVO data) {
        return tb06016service.insertIBIMS204B(data);
    }

    @PostMapping(value = "/updateMdwyRdmpFeeRto")
    public int updateIBIMS204B(@RequestBody IBIMS204BVO data) {
        return tb06016service.updateIBIMS204B(data);
    }

    @PostMapping(value = "/deleteMdwyRdmpFeeRto")
    public int deleteIBIMS204B(@RequestBody IBIMS204BVO data) {
        return tb06016service.deleteIBIMS204B(data);
    }
}
