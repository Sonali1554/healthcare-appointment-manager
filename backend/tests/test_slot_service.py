from datetime import date, time


def generate_test_slots(
    start_time: time,
    end_time: time,
    duration_minutes: int,
):
    from datetime import datetime, timedelta

    current = datetime.combine(date.today(), start_time)
    end = datetime.combine(date.today(), end_time)

    duration = timedelta(minutes=duration_minutes)

    slots = []

    while current + duration <= end:
        slots.append(
            (
                current.time(),
                (current + duration).time(),
            )
        )

        current += duration

    return slots


def test_generate_slots():
    slots = generate_test_slots(
        time(9, 0),
        time(12, 0),
        30,
    )

    assert len(slots) == 6

    assert slots[0] == (
        time(9, 0),
        time(9, 30),
    )

    assert slots[-1] == (
        time(11, 30),
        time(12, 0),
    )