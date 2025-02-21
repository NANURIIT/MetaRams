package com.nanuri.rams.business.assessment.tb90.tb9020;

import java.util.List;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nanuri.rams.business.common.dto.IBIMS997BDTO;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequestMapping("/TB9020B")
@RequiredArgsConstructor
@RestController
public class TB9020APIController {

    private final TB9020Service tb9020Service;

    // @PostMapping(value = "/select")
    // public int select(@RequestBody int data) {
    //     return tb9020Service.select(data);
    // }

    @PostMapping(value = "/insert")
    public int insert(@RequestBody IBIMS997BDTO param) {
        return tb9020Service.insert(param);
    }

    // @PostMapping(value = "/delete")
    // public int delete(@RequestBody int data) {
    //     return tb9020Service.delete(data);
    // }
}
