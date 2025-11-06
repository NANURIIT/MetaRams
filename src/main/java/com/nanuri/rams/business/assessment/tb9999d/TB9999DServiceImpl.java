package com.nanuri.rams.business.assessment.tb9999d;

import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;


import com.nanuri.rams.business.common.mapper.IBIMS997BMapper;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
@EnableScheduling
public class TB9999DServiceImpl implements TB9999DService, Runnable {

    static boolean autoSave = false;
    private final IBIMS997BMapper ibims997bMapper;

    private String date;
    private String prevDate;
    private volatile boolean isRunning = false;

    @Override
    public String tb9999d(String date) {

        String result;

        if(isRunning == true){
            log.debug("### Another daemon is running ###");
            if(prevDate.equals(date)){
                return "=";
            }
            result = prevDate;
            return result;
        }

        this.date = date;
        isRunning = true;
        log.debug("### daemon start ###");
        Thread daemon = new Thread(this); // this를 전달
        daemon.setDaemon(true);
        prevDate = date;
        daemon.start();
        result = "";
        return result;
    }

    @Scheduled(cron = "0 30 19 * * ?")
    @Override
    public void run() {

        /*
           jobCount() 는 “오늘자 배치가 총 몇 개여야 완료인지”를 알아내는 함수
           이 값과 “현재까지 완료된 Job 수(nowData)”를 비교하여 배치를 중지시킬 타이밍을 결정
                   
        */

        // run이 스케줄에 의해 최초 진입할 때 date는 일반적으로 null
        int master = ibims997bMapper.jobCount(null); // ★ 쿼리에서 항상 BZ_DD 기준로 세팅되도록 
        log.info("[TB9999D] run() curDate param={}, master={}", date, master);

        // try {

        //     while (true) {

        //         int nowData = ibims997bMapper.batchMonitering(date);
        //         IBIMS997BDTO needUpdateData = ibims997bMapper.getJobId(date);

        //         //  모든 배치가 끝난 상황
        //         if (nowData == master) {
        //             isRunning = false;
        //             break;
        //         } else if (needUpdateData == null) {
        //             Thread.sleep(5000);
        //             continue;
        //         } else if ("6".equals(needUpdateData.getJobStatus())) {
        //             needUpdateData.setJobStatus("8");
        //             ibims997bMapper.jobStatusUpdate(needUpdateData);
        //             isRunning = false;
        //             break;
        //         } else {
        //             // api 설정 해줘야함
        //             // 임시 주소
        //             String ip = "http://localhost:18092/";
        //             String batchUpdateUriString = ip + needUpdateData.getJobId() + "/insert";
        //             URI batchUpdateUri = URI.create(batchUpdateUriString);

        //             CountDownLatch latch = new CountDownLatch(1);

        //             // 배치 실행
        //             urlController.callApi(batchUpdateUri, needUpdateData, latch);
        //             latch.await(); // callApi 메서드가 완료될 때까지 대기

        //         }
        //         Thread.sleep(5000);
        //     }
        // } catch (InterruptedException e) {
        //     Thread.currentThread().interrupt();
        //     log.error("Thread was interrupted", e);
        // }
    }

    // private void autoSave() {

    // }

}
